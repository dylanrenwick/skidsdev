<?php

class Config
{
    // this is public to allow better Unit Testing
    public static array $config;

    private static bool $isLoaded = false;

    public static function get(string $key): mixed
    {
        if (!self::$isLoaded) {
            $config_file =
                "../application/config/config." . Environment::get() . ".php";

            if (!file_exists($config_file)) {
                return false;
            }

            self::$config = require $config_file;
            self::$isLoaded = true;
        }

        return self::$config[$key];
    }
}
