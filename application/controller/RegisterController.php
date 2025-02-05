<?php

/**
 * RegisterController
 * Register new user
 */
class RegisterController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class. The parent::__construct thing is necessary to
     * put checkAuthentication in here to make an entire controller only usable for logged-in users (for sure not
     * needed in the RegisterController).
     */
    public function __construct()
    {
        parent::__construct();

        if (Config::get("ALLOW_REGISTER") == "NONE") {
            Auth::checkAuthentication();
        }
    }

    /**
     * Register page
     * Show the register form, but redirect to main-page if user is already logged-in
     */
    public function index(): void
    {
        if (LoginModel::isUserLoggedIn()) {
            Redirect::home();
        } elseif (Config::get("ALLOW_REGISTER") == "OAUTH") {
            Redirect::to("register/oauth");
        } else {
            $this->View->render("register/index");
        }
    }

    public function oauth(): void
    {
        if (LoginModel::isUserLoggedIn()) {
            Redirect::home();
        } elseif (
            Config::get("ALLOW_REGISTER") != "OAUTH" &&
            Config::get("ALLOW_REGISTER") != "ALL"
        ) {
            Redirect::to("register/index");
        } else {
            $this->View->render("register/oauth");
        }
    }

    public function oauth_signup(): void
    {
        $provider = Request::get("provider");
        if (
            !$provider ||
            !in_array($provider, Config::get("OAUTH_PROVIDERS"))
        ) {
            Redirect::to("register/oauth");
        }

        $providerSettings = Config::get("OAUTH_SETTINGS")[$provider];
        if ($providerSettings == null) {
            Redirect::to("register/oauth");
        }
        $providerSettings["redirectUri"] =
            Config::get("URL") . "register/oauth_signup?provider=$provider";

        switch ($provider) {
            case "discord":
                $providerClient = new \Wohali\OAuth2\Client\Provider\Discord(
                    $providerSettings
                );
                break;
            case "github":
                $providerClient = new \League\OAuth2\Client\Provider\GitHub(
                    $providerSettings
                );
                break;
        }

        if (!isset($providerClient)) {
            Redirect::to("register/oauth");
        }

        if (!Request::get("code")) {
            $scopeOptions = Config::get("OAUTH_OPTIONS")[$provider];
            if ($scopeOptions == null) {
                Redirect::to("register/oauth");
            }
            $authUrl = $providerClient->getAuthorizationUrl($scopeOptions);
            Session::set("oauth2state", $providerClient->getState());
            header("Location: " . $authUrl);
        } elseif (
            empty(Request::get("state")) ||
            Request::get("state") !== Session::get("oauth2state")
        ) {
            Session::delete("oauth2state");
            // TODO: Add error feedback for invalid state
            Redirect::to("register/oauth");
        } else {
            $token = $providerClient->getAccessToken("authorization_code", [
                "code" => Request::get("code"),
            ]);

            $user = $providerClient->getResourceOwner($token);
            var_export($user->toArray());
        }
    }

    public function oauth_discord(): void
    {
        $providerSettings = Config::get("OAUTH_SETTINGS")["discord"];
        $providerClient = new \Wohali\OAuth2\Client\Provider\Discord(
            $providerSettings
        );

        if (!Request::get("code")) {
            $authUrl = $providerClient->getAuthorizationUrl();
            Session::set("oauth2state", $providerClient->getState());
            header("Location: " . $authUrl);
        } elseif (
            empty(Request::get("state")) ||
            Request::get("state") !== Session::get("oauth2state")
        ) {
            Session::delete("oauth2state");
            // TODO: Add error feedback for invalid state
            Redirect::to("register/oauth");
        } else {
            $token = $providerClient->getAccessToken("authorization_code", [
                "code" => Request::get("code"),
            ]);

            $user = $providerClient->getResourceOwner($token);
            var_export($user->toArray());
        }
    }

    /**
     * Register page action
     * POST-request after form submit
     */
    public function register_action(): void
    {
        $registration_successful = RegistrationModel::registerNewUser();

        if ($registration_successful) {
            Redirect::to("login/index");
        } else {
            Redirect::to("register/index");
        }
    }

    /**
     * Verify user after activation mail link opened
     * @param int $user_id user's id
     * @param string $user_activation_verification_code user's verification token
     */
    public function verify(
        int $user_id,
        string $user_activation_verification_code
    ): void {
        if (isset($user_id) && isset($user_activation_verification_code)) {
            RegistrationModel::verifyNewUser(
                $user_id,
                $user_activation_verification_code
            );
            $this->View->render("register/verify");
        } else {
            Redirect::to("login/index");
        }
    }

    /**
     * Generate a captcha, write the characters into $_SESSION['captcha'] and returns a real image which will be used
     * like this: <img src="......./login/showCaptcha" />
     * IMPORTANT: As this action is called via <img ...> AFTER the real application has finished executing (!), the
     * SESSION["captcha"] has no content when the application is loaded. The SESSION["captcha"] gets filled at the
     * moment the end-user requests the <img .. >
     * Maybe refactor this sometime.
     */
    public function showCaptcha(): void
    {
        CaptchaModel::generateAndShowCaptcha();
    }
}
