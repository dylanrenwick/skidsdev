<?php

/**
 * Class RegistrationModel
 *
 * Everything registration-related happens here.
 */
class RegistrationModel
{
    /**
     * Handles the entire registration process for DEFAULT users (not for people who register with
     * 3rd party services, like facebook) and creates a new user in the database if everything is fine
     *
     * @return boolean Gives back the success status of the registration
     */
    public static function registerNewUser()
    {
        // clean the input
        $username = strip_tags(Request::post('username'));
        $email = strip_tags(Request::post('email'));
        $email_repeat = strip_tags(Request::post('email_repeat'));
        $password_new = Request::post('password_new');
        $password_repeat = Request::post('password_repeat');

        // crypt the password with the PHP 5.5's password_hash() function, results in a 60 character hash string.
        // @see php.net/manual/en/function.password-hash.php for more, especially for potential options
        $password_hash = password_hash($password_new, PASSWORD_DEFAULT);

        // make return a bool variable, so both errors can come up at once if needed
        $return = true;

        // check if username already exists
        if (UserModel::doesUsernameAlreadyExist($username)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_USERNAME_ALREADY_TAKEN'));
            $return = false;
        }

        // check if email already exists
        if (UserModel::doesEmailAlreadyExist($email)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_ALREADY_TAKEN'));
            $return = false;
        }

        // if Username or Email were false, return false
        if (!$return) return false;

        // generate random hash for email verification (40 char string)
        $activation_hash = sha1(uniqid(mt_rand(), true));

        // write user data to database
        if (!self::writeNewUserToDatabase($username, $password_hash, $email, time(), $activation_hash)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_ACCOUNT_CREATION_FAILED'));
            return false; // no reason not to return false here
        }

        // get id of the user that has been created, to keep things clean we DON'T use lastInsertId() here
        $id = UserModel::getUserIdByUsername($username);

        if (!$id) {
            Session::add('feedback_negative', Text::get('FEEDBACK_UNKNOWN_ERROR'));
            return false;
        }

        // send verification email
        if (self::sendVerificationEmail($id, $email, $activation_hash)) {
            Session::add('feedback_positive', Text::get('FEEDBACK_ACCOUNT_SUCCESSFULLY_CREATED'));
            return true;
        }

        // if verification email sending failed: instantly delete the user
        //self::rollbackRegistrationByUserId($id);
        Session::add('feedback_negative', Text::get('FEEDBACK_VERIFICATION_MAIL_SENDING_FAILED'));
        return false;
    }

    /**
     * Validates the registration input
     *
     * @param $captcha
     * @param $username
     * @param $password_new
     * @param $password_repeat
     * @param $email
     * @param $email_repeat
     *
     * @return bool
     */
    public static function registrationInputValidation($captcha, $username, $password_new, $password_repeat, $email, $email_repeat)
    {
        $return = true;

        // perform all necessary checks
        if (!CaptchaModel::checkCaptcha($captcha)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_CAPTCHA_WRONG'));
            $return = false;
        }

        // if username, email and password are all correctly validated, but make sure they all run on first sumbit
        if (self::validateUserName($username) AND self::validateUserEmail($email, $email_repeat) AND self::validateUserPassword($password_new, $password_repeat) AND $return) {
            return true;
        }

        // otherwise, return false
        return false;
    }

    /**
     * Validates the username
     *
     * @param $username
     * @return bool
     */
    public static function validateUserName($username)
    {
        if (empty($username)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_USERNAME_FIELD_EMPTY'));
            return false;
        }

        // if username is too short (2), too long (64) or does not fit the pattern (aZ09)
        if (!preg_match('/^[a-zA-Z0-9]{2,64}$/', $username)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_USERNAME_DOES_NOT_FIT_PATTERN'));
            return false;
        }

        return true;
    }

    /**
     * Validates the email
     *
     * @param $email
     * @param $email_repeat
     * @return bool
     */
    public static function validateUserEmail($email, $email_repeat)
    {
        if (empty($email)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_FIELD_EMPTY'));
            return false;
        }

        if ($email !== $email_repeat) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_REPEAT_WRONG'));
            return false;
        }

        // validate the email with PHP's internal filter
        // side-fact: Max length seems to be 254 chars
        // @see http://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_DOES_NOT_FIT_PATTERN'));
            return false;
        }

        return true;
    }

    /**
     * Validates the password
     *
     * @param $password_new
     * @param $password_repeat
     * @return bool
     */
    public static function validateUserPassword($password_new, $password_repeat)
    {
        if (empty($password_new) OR empty($password_repeat)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_PASSWORD_FIELD_EMPTY'));
            return false;
        }

        if ($password_new !== $password_repeat) {
            Session::add('feedback_negative', Text::get('FEEDBACK_PASSWORD_REPEAT_WRONG'));
            return false;
        }

        if (strlen($password_new) < 6) {
            Session::add('feedback_negative', Text::get('FEEDBACK_PASSWORD_TOO_SHORT'));
            return false;
        }

        return true;
    }

    /**
     * Writes the new user's data to the database
     *
     * @param $username
     * @param $password_hash
     * @param $email
     * @param $creation_timestamp
     * @param $activation_hash
     *
     * @return bool
     */
    public static function writeNewUserToDatabase($username, $password_hash, $email, $creation_timestamp, $activation_hash)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        // write new users data into database
        $sql = "INSERT INTO users (username, password_hash, email, creation_timestamp, activation_hash, provider_type)
                    VALUES (:username, :password_hash, :email, :creation_timestamp, :activation_hash, :provider_type)";
        $query = $database->prepare($sql);
        $query->execute(array(':username' => $username,
                              ':password_hash' => $password_hash,
                              ':email' => $email,
                              ':creation_timestamp' => $creation_timestamp,
                              ':activation_hash' => $activation_hash,
                              ':provider_type' => 'DEFAULT'));
        $count =  $query->rowCount();
        if ($count == 1) {
            return true;
        }

        return false;
    }

    /**
     * Deletes the user from users table. Currently used to rollback a registration when verification mail sending
     * was not successful.
     *
     * @param $id
     */
    public static function rollbackRegistrationByUserId($id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("DELETE FROM users WHERE id = :id");
        $query->execute(array(':id' => $id));
    }

    /**
     * Sends the verification email (to confirm the account).
     * The construction of the mail $body looks weird at first, but it's really just a simple string.
     *
     * @param int $id user's id
     * @param string $email user's email
     * @param string $activation_hash user's mail verification hash string
     *
     * @return boolean gives back true if mail has been sent, gives back false if no mail could been sent
     */
    public static function sendVerificationEmail($id, $email, $activation_hash)
    {
        $body = Config::get('EMAIL_VERIFICATION_CONTENT') . Config::get('URL') . Config::get('EMAIL_VERIFICATION_URL')
                . '/' . urlencode($id) . '/' . urlencode($activation_hash);

        $mail = new Mail;
        $mail_sent = $mail->sendMail($email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'),
            Config::get('EMAIL_VERIFICATION_FROM_NAME'), Config::get('EMAIL_VERIFICATION_SUBJECT'), $body
        );

        if ($mail_sent) {
            Session::add('feedback_positive', Text::get('FEEDBACK_VERIFICATION_MAIL_SENDING_SUCCESSFUL'));
            return true;
        } else {
            Session::add('feedback_negative', Text::get('FEEDBACK_VERIFICATION_MAIL_SENDING_ERROR') . $mail->getError() );
            return false;
        }
    }

    /**
     * checks the email/verification code combination and set the user's activation status to true in the database
     *
     * @param int $id user id
     * @param string $activation_verification_code verification token
     *
     * @return bool success status
     */
    public static function verifyNewUser($id, $activation_verification_code)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE users SET active = 1, activation_hash = NULL
                WHERE id = :id AND activation_hash = :activation_hash LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':id' => $id, ':activation_hash' => $activation_verification_code));

        if ($query->rowCount() == 1) {
            Session::add('feedback_positive', Text::get('FEEDBACK_ACCOUNT_ACTIVATION_SUCCESSFUL'));
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_ACCOUNT_ACTIVATION_FAILED'));
        return false;
    }
}
