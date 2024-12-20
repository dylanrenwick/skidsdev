<?php

class Text
{
    private static array $texts;

    public static function get(?string $key, array $data = null): ?string
    {
        // if not $key
        if (!$key) {
            return null;
        }

        if ($data) {
            foreach ($data as $var => $value) {
                ${$var} = $value;
            }
        }

        // load config file (this is only done once per application lifecycle)
        if (!self::$texts) {
            self::$texts = require('../application/config/texts.php');
        }

        // check if array key exists
        if (!array_key_exists($key, self::$texts)) {
            return null;
        }

        return self::$texts[$key];
    }
}
