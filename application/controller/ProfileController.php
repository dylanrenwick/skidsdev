<?php

class ProfileController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class
     */
    public function __construct()
    {
        parent::__construct();

        Auth::checkAuthentication();
    }

    /**
     * This method controls what happens when you move to /overview/index in your app.
     * Shows a list of all users.
     */
    public function index(): void
    {
        $this->View->render("profile/index", [
            "user" => UserModel::getUserDataByUserId(Session::get("user_id")),
        ]);
    }

    /**
     * This method controls what happens when you move to /overview/showProfile in your app.
     * Shows the (public) details of the selected user.
     * @param $user_id int id the the user
     */
    public function showProfile(int $user_id): void
    {
        if (isset($user_id)) {
            $this->View->render("profile/showProfile", [
                "user" => UserModel::getPublicProfileOfUser($user_id),
            ]);
        } else {
            Redirect::home();
        }
    }
}
