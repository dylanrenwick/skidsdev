<?php

/**
 * Class CaptchaModel
 *
 * This model class handles all the captcha stuff.
 * Currently this uses the excellent Captcha generator lib from https://github.com/Gregwar/Captcha
 * Have a look there for more options etc.
 */
class CaptchaModel
{
    /**
     * Generates the captcha, "returns" a real image, this is why there is header('Content-type: image/jpeg')
     * Note: This is a very special method, as this is echoes out binary data.
     */
    public static function generateAndShowCaptcha()
    {
        $op = rand(0,3);

        switch($op) {
            case 0:
                $a = rand(1,100);
                $b = rand(1,100);
                $result = $a + $b;
                $op = '+';
                break;
            case 1:
                $a = rand(1,100);
                $b = rand(1,100);
                $low = min($a, $b);
                $hi = max($a, $b);
                $a = $hi;
                $b = $low;
                $result = $a - $b;
                $op = '-';
                break;
            case 2:
                $a = rand(1,10);
                $b = rand(1,10);
                $result = $a * $b;
                $op = 'x';
                break;
            case 3:
                $a = rand(1,10);
                $b = rand(1,10);
                $a = $a * $b;
                $result = $a / $b;
                $op = '/';
                break;
        }

        Session::set('captcha', $result);

        return "What is $a $op $b?";
    }

    /**
     * Checks if the entered captcha is the same like the one from the rendered image which has been saved in session
     * @param $captcha string The captcha characters
     * @return bool success of captcha check
     */
    public static function checkCaptcha($captcha)
    {
        if (Session::get('captcha') && ($captcha == Session::get('captcha'))) {
            return true;
        }

        return false;
    }
}
