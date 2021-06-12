<?php

class TokenModel
{
    public static function createNewToken()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $token = self::generateToken();

        $sql = "INSERT INTO tokens (token, created, used) VALUES (:token, NOW(), 0)";
        $query = $database->prepare($sql);
        $query->execute(array(':token' => $token));

        $count =  $query->rowCount();
        if ($count == 1) return $token;
        return false;
    }

    public static function validateToken($token)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id FROM tokens WHERE token = :token AND used = 0";
        $query = $database->prepare($sql);
        $query->execute(array(':token' => $token));

        $count =  $query->rowCount();
        return ($count == 1);
    }

    public static function markTokenAsUsed($token)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE tokens SET used = 1 WHERE token = :token";
        $query = $database->prepare($sql);
        $query->execute(array(':token' => $token));

        $count =  $query->rowCount();
        return ($count == 1);
    }

    private static function generateToken($length = 64)
    {
        $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
        if ($length < 1) {
            throw new RangeException("Length must be a positive integer");
        }
        $pieces = [];
        $max = strlen($keyspace) - 1;
        for ($i = 0; $i < $length; ++$i) {
            $pieces []= $keyspace[random_int(0, $max)];
        }
        return implode('', $pieces);
    }
}