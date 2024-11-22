<?php

class AdminController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class
     */
    public function __construct()
    {
        parent::__construct();

        // special authentication check for the entire controller: Note the check-ADMIN-authentication!
        // All methods inside this controller are only accessible for admins (= users that have role type 7)
        Auth::checkAdminAuthentication();
    }

    public function index(): void
    {
        $this->View->render('admin/index');
    }

    /**
     * This method controls what happens when you move to /admin or /admin/index in your app.
     */
    public function users(): void
    {
        $this->View->render('admin/users', array(
			'users' => UserModel::getPublicProfilesOfAllUsers())
        );
    }

    public function actionAccountSettings(): void
    {
        AdminModel::setAccountSuspensionAndDeletionStatus(
            Request::post('suspension'), Request::post('softDelete'), Request::post('user_id')
        );

        Redirect::to("admin");
    }
}
