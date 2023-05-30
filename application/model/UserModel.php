<?php

/**
 * UserModel
 * Handles all the PUBLIC profile stuff. This is not for getting data of the logged in user, it's more for handling
 * data of all the other users. Useful for display profile information, creating user lists etc.
 */
class UserModel
{
    /**
     * Gets an array that contains all the users in the database. The array's keys are the user ids.
     * Each array element is an object, containing a specific user's data.
     * The avatar line is built using Ternary Operators, have a look here for more:
     * @see http://davidwalsh.name/php-shorthand-if-else-ternary-operators
     *
     * @return array The profiles of all users
     */
    public static function getPublicProfilesOfAllUsers()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, username, email, active, has_avatar, deleted FROM users";
        $query = $database->prepare($sql);
        $query->execute();

        $all_users_profiles = array();

        foreach ($query->fetchAll() as $user) {

            // all elements of array passed to Filter::XSSFilter for XSS sanitation, have a look into
            // application/core/Filter.php for more info on how to use. Removes (possibly bad) JavaScript etc from
            // the user's values
            array_walk_recursive($user, 'Filter::XSSFilter');

            $all_users_profiles[$user->id] = new stdClass();
            $all_users_profiles[$user->id]->id = $user->id;
            $all_users_profiles[$user->id]->username = $user->username;
            $all_users_profiles[$user->id]->email = $user->email;
            $all_users_profiles[$user->id]->active = $user->active;
            $all_users_profiles[$user->id]->deleted = $user->deleted;
            $all_users_profiles[$user->id]->avatar_link = (Config::get('USE_GRAVATAR') ? AvatarModel::getGravatarLinkByEmail($user->email) : AvatarModel::getPublicAvatarFilePathOfUser($user->has_avatar, $user->id));
        }

        return $all_users_profiles;
    }

    /**
     * Gets a user's profile data, according to the given $id
     * @param int $id The user's id
     * @return mixed The selected user's profile
     */
    public static function getPublicProfileOfUser($id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, username, email, active, has_avatar, deleted
                FROM users WHERE id = :id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':id' => $id));

        $user = $query->fetch();

        if ($query->rowCount() == 1) {
            if (Config::get('USE_GRAVATAR')) {
                $user->avatar_link = AvatarModel::getGravatarLinkByEmail($user->email);
            } else {
                $user->avatar_link = AvatarModel::getPublicAvatarFilePathOfUser($user->has_avatar, $user->id);
            }
        } else {
            Session::add('feedback_negative', Text::get('FEEDBACK_DOES_NOT_EXIST'));
        }

        // all elements of array passed to Filter::XSSFilter for XSS sanitation, have a look into
        // application/core/Filter.php for more info on how to use. Removes (possibly bad) JavaScript etc from
        // the user's values
        array_walk_recursive($user, 'Filter::XSSFilter');

        return $user;
    }

    /**
     * @param $name_or_email
     *
     * @return mixed
     */
    public static function getUserDataByUserNameOrEmail($name_or_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("SELECT id, username, email FROM users
                                     WHERE (username = :name_or_email OR email = :name_or_email)
                                           AND provider_type = :provider_type LIMIT 1");
        $query->execute(array(':name_or_email' => $name_or_email, ':provider_type' => 'DEFAULT'));

        return $query->fetch();
    }

    /**
     * Checks if a username is already taken
     *
     * @param $username string username
     *
     * @return bool
     */
    public static function doesUsernameAlreadyExist($username)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("SELECT id FROM users WHERE username = :username LIMIT 1");
        $query->execute(array(':username' => $username));
        if ($query->rowCount() == 0) {
            return false;
        }
        return true;
    }

    /**
     * Checks if a email is already used
     *
     * @param $email string email
     *
     * @return bool
     */
    public static function doesEmailAlreadyExist($email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
        $query->execute(array(':email' => $email));
        if ($query->rowCount() == 0) {
            return false;
        }
        return true;
    }

    /**
     * Writes new username to database
     *
     * @param $id int user id
     * @param $new_name string new username
     *
     * @return bool
     */
    public static function saveNewUserName($id, $new_name)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("UPDATE users SET username = :username WHERE id = :id LIMIT 1");
        $query->execute(array(':username' => $new_name, ':id' => $id));
        if ($query->rowCount() == 1) {
            return true;
        }
        return false;
    }

    /**
     * Writes new email address to database
     *
     * @param $id int user id
     * @param $new_email string new email address
     *
     * @return bool
     */
    public static function saveNewEmailAddress($id, $new_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("UPDATE users SET email = :email WHERE id = :id LIMIT 1");
        $query->execute(array(':email' => $new_email, ':id' => $id));
        $count = $query->rowCount();
        if ($count == 1) {
            return true;
        }
        return false;
    }

    /**
     * Edit the user's name, provided in the editing form
     *
     * @param $new_name string The new username
     *
     * @return bool success status
     */
    public static function editUserName($new_name)
    {
        // new username same as old one ?
        if ($new_name == Session::get('username')) {
            Session::add('feedback_negative', Text::get('FEEDBACK_USERNAME_SAME_AS_OLD_ONE'));
            return false;
        }

        // username cannot be empty and must be azAZ09 and 2-64 characters
        if (!preg_match("/^[a-zA-Z0-9]{2,64}$/", $new_name)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_USERNAME_DOES_NOT_FIT_PATTERN'));
            return false;
        }

        // clean the input, strip usernames longer than 64 chars (maybe fix this ?)
        $new_name = substr(strip_tags($new_name), 0, 64);

        // check if new username already exists
        if (self::doesUsernameAlreadyExist($new_name)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_USERNAME_ALREADY_TAKEN'));
            return false;
        }

        $status_of_action = self::saveNewUserName(Session::get('id'), $new_name);
        if ($status_of_action) {
            Session::set('username', $new_name);
            Session::add('feedback_positive', Text::get('FEEDBACK_USERNAME_CHANGE_SUCCESSFUL'));
            return true;
        } else {
            Session::add('feedback_negative', Text::get('FEEDBACK_UNKNOWN_ERROR'));
            return false;
        }
    }

    /**
     * Edit the user's email
     *
     * @param $new_email
     *
     * @return bool success status
     */
    public static function editUserEmail($new_email)
    {
        // email provided ?
        if (empty($new_email)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_FIELD_EMPTY'));
            return false;
        }

        // check if new email is same like the old one
        if ($new_email == Session::get('email')) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_SAME_AS_OLD_ONE'));
            return false;
        }

        // user's email must be in valid email format, also checks the length
        // @see http://stackoverflow.com/questions/21631366/php-filter-validate-email-max-length
        // @see http://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        if (!filter_var($new_email, FILTER_VALIDATE_EMAIL)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_DOES_NOT_FIT_PATTERN'));
            return false;
        }

        // strip tags, just to be sure
        $new_email = substr(strip_tags($new_email), 0, 254);

        // check if user's email already exists
        if (self::doesEmailAlreadyExist($new_email)) {
            Session::add('feedback_negative', Text::get('FEEDBACK_EMAIL_ALREADY_TAKEN'));
            return false;
        }

        // write to database, if successful ...
        // ... then write new email to session, Gravatar too (as this relies to the user's email address)
        if (self::saveNewEmailAddress(Session::get('id'), $new_email)) {
            Session::set('email', $new_email);
            Session::set('gravatar_image_url', AvatarModel::getGravatarLinkByEmail($new_email));
            Session::add('feedback_positive', Text::get('FEEDBACK_EMAIL_CHANGE_SUCCESSFUL'));
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_UNKNOWN_ERROR'));
        return false;
    }

    /**
     * Gets the user's id
     *
     * @param $username
     *
     * @return mixed
     */
    public static function getUserIdByUsername($username)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id FROM users WHERE username = :username AND provider_type = :provider_type LIMIT 1";
        $query = $database->prepare($sql);

        // DEFAULT is the marker for "normal" accounts (that have a password etc.)
        // There are other types of accounts that don't have passwords etc. (FACEBOOK)
        $query->execute(array(':username' => $username, ':provider_type' => 'DEFAULT'));

        // return one row (we only have one result or nothing)
        return $query->fetch()->id;
    }

    /**
     * Gets the user's data
     *
     * @param $username string User's name
     *
     * @return mixed Returns false if user does not exist, returns object with user's data when user exists
     */
    public static function getUserDataByUsername($username)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, username, email, password_hash, active,deleted, suspension_timestamp, account_type,
                       failed_logins, last_failed_login
                  FROM users
                 WHERE (username = :username OR email = :username)
                       AND provider_type = :provider_type
                 LIMIT 1";
        $query = $database->prepare($sql);

        // DEFAULT is the marker for "normal" accounts (that have a password etc.)
        // There are other types of accounts that don't have passwords etc. (FACEBOOK)
        $query->execute(array(':username' => $username, ':provider_type' => 'DEFAULT'));

        // return one row (we only have one result or nothing)
        return $query->fetch();
    }

    /**
     * Gets the user's data
     *
     * @param $id
     *
     * @return mixed Returns false if user does not exist, returns object with user's data when user exists
     */
    public static function getUserDataByUserId($id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id,
                       username,
                       email,
                       active,
                       deleted,
                       suspension_timestamp,
                       account_type
                  FROM users
                 WHERE id = :id
                       AND provider_type = :provider_type
                 LIMIT 1";
        $query = $database->prepare($sql);

        // DEFAULT is the marker for "normal" accounts (that have a password etc.)
        // There are other types of accounts that don't have passwords etc. (FACEBOOK)
        $query->execute(array(':id' => $id, ':provider_type' => 'DEFAULT'));

        // return one row (we only have one result or nothing)
        return $query->fetch();
    }

    /**
     * Gets the user's data by user's id and a token (used by login-via-cookie process)
     *
     * @param $id
     * @param $token
     *
     * @return mixed Returns false if user does not exist, returns object with user's data when user exists
     */
    public static function getUserDataByUserIdAndToken($id, $token)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        // get real token from database (and all other data)
        $query = $database->prepare("SELECT id, username, email, password_hash, active,
                                          account_type,  has_avatar, failed_logins, last_failed_login
                                     FROM users
                                     WHERE id = :id
                                       AND remember_me_token = :remember_me_token
                                       AND remember_me_token IS NOT NULL
                                       AND provider_type = :provider_type LIMIT 1");
        $query->execute(array(':id' => $id, ':remember_me_token' => $token, ':provider_type' => 'DEFAULT'));

        // return one row (we only have one result or nothing)
        return $query->fetch();
    }
}
