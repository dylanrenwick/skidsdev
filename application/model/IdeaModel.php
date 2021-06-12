<?php

/**
 * IdeaModel
 * This is basically a simple CRUD (Create/Read/Update/Delete) demonstration.
 */
class IdeaModel
{
    /**
     * Get all posts (posts are just example data that the user has created)
     * @return array an array with several objects (the results)
     */
    public static function getAllIdeas($showUsed)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        if (!$showUsed) $whereClause = "used is null";

        $sql = "SELECT * FROM ideas";
        if (isset($whereClause)) $sql .= "WHERE $whereClause";

        $query = $database->prepare($sql);
        $query->execute();

        // fetchAll() is the PDO method that gets all result rows
        return $query->fetchAll();
    }

    /**
     * Get a single post
     * @param int $post_id id of the specific post
     * @return object a single object (the result)
     */
    public static function getIdea($idea_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM ideas WHERE id = :id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':id' => $idea_id));

        // fetch() is the PDO method that gets a single result
        return $query->fetch();
    }

    /**
     * Set a post (create a new one)
     * @param string $post_text post text that will be created
     * @return bool feedback (was the post created properly ?)
     */
    public static function createIdea($idea_name)
    {
        if (!$idea_name || strlen($idea_name) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO ideas (name) VALUES (:idea_name)";
        $query = $database->prepare($sql);
        $query->execute(array(
            ':idea_name' => $idea_name
        ));

        if ($query->rowCount() == 1) {
            $sql = "SELECT * FROM ideas WHERE name = :idea_name";
            $query = $database->prepare($sql);
            $query->execute(array(
                ':idea_name' => $idea_name,
            ));

            return $query->fetch();
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    /**
     * Delete a specific post
     * @param int $post_id id of the post
     * @return bool feedback (was the post deleted properly ?)
     */
    public static function deleteIdea($idea_id)
    {
        if (!$idea_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM ideas WHERE id = :idea_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':idea_id' => $idea_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
