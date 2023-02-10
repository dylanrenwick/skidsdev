<?php

/**
 * Class Application
 * The heart of the application
 */
class Application
{
    /** @var mixed Instance of the controller */
    private $controller;

    /** @var array URL parameters, will be passed to used controller-method */
    private $parameters = array();

    /** @var string Just the name of the controller, useful for checks inside the view ("where am I ?") */
    private $controller_name;

    /** @var string Just the name of the controller's method, useful for checks inside the view ("where am I ?") */
    private $action_name;

    /**
     * Start the application, analyze URL elements, call according controller/method or relocate to fallback location
     */
    public function __construct()
    {
        // create array with URL parts in $url
        Request::splitUrl();

        // creates controller and action names (from URL input)
        $this->createControllerAndActionNames();

        // does such a controller exist ?
        if (file_exists(Config::get('PATH_CONTROLLER') . Request::$controller_name . '.php')) {

            // load this file and create this controller
            // example: if controller would be "car", then this line would translate into: $this->car = new car();
            require Config::get('PATH_CONTROLLER') . Request::$controller_name . '.php';
            $this->controller = new Request::$controller_name();

            $requestRoute = Request::$parameters;
            $this->controller->requestRoute = $requestRoute;

            // check are controller and method existing and callable?
            if (is_callable(array($this->controller, Request::$action_name))) {
                if (!empty(Request::$parameters)) {
                    // call the method and pass arguments to it
                    call_user_func_array(array($this->controller, Request::$action_name), Request::$parameters);
                } else {
                    // if no parameters are given, just call the method without parameters, like $this->index->index();
                    $this->controller->{Request::$action_name}();
                }
            } else {
                // load 404 error page
                require Config::get('PATH_CONTROLLER') . 'ErrorController.php';
                $this->controller = new ErrorController;
                $this->controller->error404();
            }
        } else {
            // load 404 error page
            require Config::get('PATH_CONTROLLER') . 'ErrorController.php';
            $this->controller = new ErrorController;
            $this->controller->error404();
        }
    }

    /**
     * Checks if controller and action names are given. If not, default values are put into the properties.
     * Also renames controller to usable name.
     */
    private function createControllerAndActionNames()
    {
        // check for controller: no controller given ? then make controller = default controller (from config)
        if (!Request::$controller_name) {
            Request::$controller_name = Config::get('DEFAULT_CONTROLLER');
        }

        // check for action: no action given ? then make action = default action (from config)
        if (!Request::$action_name OR (strlen(Request::$action_name) == 0)) {
            Request::$action_name = Config::get('DEFAULT_ACTION');
        }

        // rename controller name to real controller class/file name ("index" to "IndexController")
        Request::$controller_name = ucwords(Request::$controller_name) . 'Controller';
    }
}
