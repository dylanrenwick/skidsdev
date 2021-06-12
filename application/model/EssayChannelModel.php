<?php

class EssayChannelModel
{
    public static function getAllChannels()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "select * from essay_channels order by name";
        $query = $database->prepare($sql);
        $query->execute();

        // fetchAll() is the PDO method that gets all result rows
        return $query->fetchAll();
    }

    public static function getActiveChannels()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "select * from essay_channels where active = 1 order by name";
        $query = $database->prepare($sql);
        $query->execute();

        // fetchAll() is the PDO method that gets all result rows
        $result = $query->fetchAll();
        return $result;
    }

    public static function getAllChannelsByCategory()
    {
        $channels = EssayChannelModel::getAllChannels();

        $results = EssayChannelModel::groupResultsByCategory($channels);
        return EssayChannelModel::filterNoiseCategories($results, $channels);
    }

    public static function getActiveChannelsByCategory()
    {
        $channels = EssayChannelModel::getActiveChannels();

        $results = EssayChannelModel::groupResultsByCategory($channels);
        return EssayChannelModel::filterNoiseCategories($results, $channels);
    }

    public static function createChannel($name, $description, $categories, $image_url)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "insert into essay_channels (name, description, categories, image_url) values (:name, :desc, :cats, :img)";

        if (is_array($categories)) $categories = implode(',', $categories);
        
        $query = $database->prepare($sql);
        $query->execute(array(
            ':name' => $name,
            ':desc' => $desc,
            ':cats' => $categories,
            ':img' => $image_url
        ));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    private static function groupResultsByCategory($channels) {
        $result = array();

        foreach ($channels as $ch) {
            $categories = explode(',', $ch->categories);
            foreach ($categories as $cat) {
                if (!isset($result[$cat])) $result[$cat] = array();
                array_push($result[$cat], $ch);
            }
        }

        return $result;
    }

    private static function filterNoiseCategories($result, $channels) {
        foreach ($channels as $ch) {
            $categories = explode(',', $ch->categories);
            $inSharedCategory = false;
            $onlyChannelInCategories = array();
            foreach ($categories as $cat) {
                if (count($result[$cat]) > 1) $inSharedCategory = true;
                else if (count($result[$cat]) == 1) array_push($onlyChannelInCategories, $cat);
            }
            if ($inSharedCategory) {
                foreach($onlyChannelInCategories as $cat) {
                    unset($result[$cat]);
                }
            }
        }

        return $result;
    }
}