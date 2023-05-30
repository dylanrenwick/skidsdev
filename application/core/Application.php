<?php
require_once Config::get('PATH_CONTROLLER') . 'ErrorController.php';

/**
 * Class Application
 * The heart of the application
 */
class Application
{
    /** @var mixed Instance of the controller */
    private Controller $controller;

    /** @var array URL parameters, will be passed to used controller-method */
    private array $parameters = array();

    /** @var string Just the name of the controller, useful for checks inside the view ("where am I ?") */
    private string $controller_name;

    /** @var string Just the name of the controller's method, useful for checks inside the view ("where am I ?") */
    private string $action_name;

    /**
     * Start the application, analyze URL elements, call according controller/method or relocate to fallback location
     */
    public function __construct()
    {
        // create array with URL parts in $url
        $url = Request::get('url');
        $req = new Request($url);

        // does such a controller exist ?
        $controller_path = Config::get('PATH_CONTROLLER') . $req->controller_file();
        if (!file_exists($controller_path))
            $this->getErrorController()->error404();

        // load this file and create this controller
        // example: if controller would be "car", then this line would translate into: $this->car = new car();
        require $controller_path;
        $this->controller = new $req->controller();

        $requestRoute = $req->parameters;
        $this->controller->requestRoute = $requestRoute;

        // check are controller and method existing and callable?
        if (!is_callable(array($this->controller, $req->action)))
            $this->getErrorController()->error404();

        if (!empty($requestRoute)) {
            // call the method and pass arguments to it
            call_user_func_array(array($this->controller, $req->action), $requestRoute);
        } else {
            // if no parameters are given, just call the method without parameters, like $this->index->index();
            $this->controller->{$req->action}();
        }
    }

    private function getErrorController(): ErrorController
    {
        $this->controller = new ErrorController();
        return $this->controller;
    }
}
