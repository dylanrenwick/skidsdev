<?php

/**
 * This is under development. Expect changes!
 * Class Request
 * Abstracts the access to $_GET, $_POST and $_COOKIE, preventing direct access to these super-globals.
 * This makes PHP code quality analyzer tools very happy.
 * @see http://php.net/manual/en/reserved.variables.request.php
 */
class Request
{
    public string $controller;
    public string $action;
    public array $parameters;

    public function __construct(?string $url)
    {
        if ($url !== null) {
            // split URL
            $url = trim($url, '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url_parts = explode('/', $url);
        } else {
            $url_parts = [];
        }

        // put URL parts into according properties
        $controller = isset($url_parts[0]) ? $url_parts[0] : Config::get('DEFAULT_CONTROLLER');
        $this->controller = ucwords($controller) . 'Controller';
        $this->action = isset($url_parts[1]) ? $url_parts[1] : Config::get('DEFAULT_ACTION');

        // rebase array keys and store the URL parameters
        $this->parameters = array_slice($url_parts, 2);
    }

    public function controller_file(): string
    {
        return $this->controller . '.php';
    }

    /**
     * Gets/returns the value of a specific key of the POST super-global.
     * When using just Request::post('x') it will return the raw and untouched $_POST['x'], when using it like
     * Request::post('x', true) then it will return a trimmed and stripped $_POST['x'] !
     *
     * @param mixed $key key
     * @return mixed the key's value or nothing
     */
    public static function post(string $key): ?string
    {
        return isset($_POST[$key]) ? $_POST[$key] : null;
    }
    
    public static function postClean(string $key): ?string
    {
        $post_val = Request::post($key);
        return ($val !== null) ? trim(strip_tags($post_val)) : $post_val;
    }

    /**
     * Returns the state of a checkbox.
     *
     * @param mixed $key key
     * @return mixed state of the checkbox
     */
    public static function postCheckbox($key)
    {
        return isset($_POST[$key]) ? 1 : null;
    }

    /**
     * gets/returns the value of a specific key of the GET super-global
     * @param mixed $key key
     * @return mixed the key's value or nothing
     */
    public static function get(string $key): ?string
    {
        return isset($_GET[$key]) ? $_GET[$key] : null;
    }

    /**
     * gets/returns the value of a specific key of the COOKIE super-global
     * @param mixed $key key
     * @return mixed the key's value or nothing
     */
    public static function cookie(string $key): ?string
    {
        return isset($_COOKIE[$key]) ? $_COOKIE[$key] : null;
    }

    public static function doNotTrack()
    {
        return (isset($_SERVER['HTTP_DNT']) && (int)$_SERVER['HTTP_DNT'] === 1);
    }
}
