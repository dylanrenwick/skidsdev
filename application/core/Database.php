<?php

class Database
{
    public static function query(
        string $sql,
        array $data = []
    ): PDOStatement|bool {
        $exclude = [];
        foreach (array_keys($data) as $key) {
            if (preg_match("/$key/", $sql) !== 1) {
                array_push($exclude, $key);
            }
        }
        $data = array_diff_key($data, array_flip($exclude));

        $db = DatabaseFactory::getFactory()->getConnection();
        $query = $db->prepare($sql);
        $query->execute($data);
        return $query;
    }

    public function prepare(string $sql): PDOStatement|bool
    {
        $db = DatabaseFactory::getFactory()->getConnection();
        return $db->prepare($sql);
    }
}
