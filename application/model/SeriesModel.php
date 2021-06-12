<?php

class SeriesModel
{
    public static function getAllSeries()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, name FROM series";
        $query = $database->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    public static function getSeriesByName($name)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, name FROM series WHERE name = :series_name";
        $query = $database->prepare($sql);
        $query->execute(array(
            ':series_name' => $name
        ));

        return $query->fetch();
    }

    public static function createSeries($name)
    {
        if (!$name || strlen($name) === 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO series (name) VALUES (:series_name)";
        $query = $database->prepare($sql);
        $query->execute(array(
            ':series_name' => $name
        ));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function deleteSeries($id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM series WHERE id = :id";
        $query = $database->prepare($sql);
        $query->execute(array(
            ':id' => $id
        ));

        return $query->rowCount() == 1;
    }
}