<?php

/**
 * UserController
 * Controls everything that is user-related
 */
class UserController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class.
     */
    public function __construct()
    {
        parent::__construct();

        // VERY IMPORTANT: All controllers/areas that should only be usable by logged-in users
        // need this line! Otherwise not-logged in users could do actions.
        Auth::checkAuthentication();
    }

    /**
     * Show user's PRIVATE profile
     */
    public function index(): void
    {
        $this->View->render("user/index", [
            "user_name" => Session::get("username"),
            "user_email" => Session::get("user_email"),
            "user_gravatar_image_url" => Session::get(
                "user_gravatar_image_url"
            ),
            "user_avatar_file" => Session::get("user_avatar_file"),
            "user_account_type" => Session::get("user_account_type"),
        ]);
    }

    /**
     * Show edit-my-username page
     */
    public function editUsername(): void
    {
        $this->View->render("user/editUsername");
    }

    /**
     * Edit user name (perform the real action after form has been submitted)
     */
    public function editUsername_action(): void
    {
        // check if csrf token is valid
        if (!Csrf::isTokenValid()) {
            LoginModel::logout();
            Redirect::home();
            exit();
        }

        UserModel::editUserName(Request::post("user_name"));
        Redirect::to("user/editUsername");
    }

    /**
     * Show edit-my-user-email page
     */
    public function editUserEmail(): void
    {
        $this->View->render("user/editUserEmail");
    }

    /**
     * Edit user email (perform the real action after form has been submitted)
     */
    // make this POST
    public function editUserEmail_action(): void
    {
        UserModel::editUserEmail(Request::post("user_email"));
        Redirect::to("user/editUserEmail");
    }

    /**
     * Edit avatar
     */
    public function editAvatar(): void
    {
        $this->View->render("user/editAvatar", [
            "avatar_file_path" => AvatarModel::getPublicUserAvatarFilePathByUserId(
                Session::get("user_id")
            ),
        ]);
    }

    /**
     * Perform the upload of the avatar
     * POST-request
     */
    public function uploadAvatar_action(): void
    {
        AvatarModel::createAvatar();
        Redirect::to("user/editAvatar");
    }

    /**
     * Delete the current user's avatar
     */
    public function deleteAvatar_action(): void
    {
        AvatarModel::deleteAvatar(Session::get("user_id"));
        Redirect::to("user/editAvatar");
    }

    /**
     * Show the change-account-type page
     */
    public function changeUserRole(): void
    {
        $this->View->render("user/changeUserRole");
    }

    /**
     * Perform the account-type changing
     * POST-request
     */
    public function changeUserRole_action(): void
    {
        if (Request::post("user_account_upgrade")) {
            // "2" is quick & dirty account type 2, something like "premium user" maybe. you got the idea :)
            UserRoleModel::changeUserRole(2);
        }

        if (Request::post("user_account_downgrade")) {
            // "1" is quick & dirty account type 1, something like "basic user" maybe.
            UserRoleModel::changeUserRole(1);
        }

        Redirect::to("user/changeUserRole");
    }

    /**
     * Password Change Page
     */
    public function changePassword(): void
    {
        $this->View->render("user/changePassword");
    }

    /**
     * Password Change Action
     * Submit form, if retured positive redirect to index, otherwise show the changePassword page again
     */
    public function changePassword_action(): void
    {
        $result = PasswordResetModel::changePassword(
            Session::get("user_name"),
            Request::post("user_password_current"),
            Request::post("user_password_new"),
            Request::post("user_password_repeat")
        );

        if ($result) {
            Redirect::to("user/index");
        } else {
            Redirect::to("user/changePassword");
        }
    }
}
