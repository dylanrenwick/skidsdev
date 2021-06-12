<?php

/**
 * PostModel
 * This is basically a simple CRUD (Create/Read/Update/Delete) demonstration.
 */
class PostModel
{
    /**
     * Get all posts (posts are just example data that the user has created)
     * @return array an array with several objects (the results)
     */
    public static function getAllPosts($offset, $showHidden)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        if ($showHidden) $whereClause = "t1.user_id = :user_id";
        else $whereClause = "active = 1";

        $sql = <<<SQL
SELECT t1.id, t1.active, t1.created_at, t1.modified_at, t1.title, t1.text, t1.user_id, t2.user_name
    FROM posts AS t1
        INNER JOIN users AS t2 ON t1.user_id = t2.user_id
    WHERE $whereClause
    ORDER BY created_at DESC
    LIMIT :offset,10
SQL;
        $query = $database->prepare($sql);
        $query->bindValue(':offset', $offset, PDO::PARAM_INT);
        if ($showHidden) $query->bindValue(':user_id', Session::get('user_id'), PDO::PARAM_INT);
        $query->execute();

        // fetchAll() is the PDO method that gets all result rows
        return $query->fetchAll();
    }

    /**
     * Get a single post
     * @param int $post_id id of the specific post
     * @return object a single object (the result)
     */
    public static function getPost($post_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = <<<SQL
SELECT t1.id, t1.active, t1.created_at, t1.modified_at, t1.title, t1.text, t1.tags, t1.user_id, t2.user_name
    FROM posts AS t1
        INNER JOIN users AS t2 ON t1.user_id = t2.user_id
    WHERE id = :post_id
    ORDER BY created_at DESC
    LIMIT 1
SQL;
        $query = $database->prepare($sql);
        $query->execute(array(':post_id' => $post_id));

        // fetch() is the PDO method that gets a single result
        return $query->fetch();
    }

    /**
     * Set a post (create a new one)
     * @param string $post_text post text that will be created
     * @return bool feedback (was the post created properly ?)
     */
    public static function createPost($post_title, $post_text, $post_tags = '', $post_series = -1)
    {
        if (!$post_text || strlen($post_text) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO posts (title, text, tags, user_id) VALUES (:post_title, :post_text, :post_tags, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(
            ':post_title' => $post_title,
            ':post_text' => $post_text,
            ':post_tags' => $post_tags,
            ':user_id' => Session::get('user_id')
        ));

        if ($query->rowCount() == 1) {
            $sql = "SELECT id FROM posts WHERE title = :post_title AND text = :post_text AND tags = :post_tags AND user_id = :user_id";
            $query = $database->prepare($sql);
            $query->execute(array(
                ':post_title' => $post_title,
                ':post_text' => $post_text,
                ':post_tags' => $post_tags,
                ':user_id' => Session::get('user_id')
            ));

            $post_id = $query->fetch()->id;

            return SeriesPostModel::createSeriesPost($post_id, $post_series);
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    /**
     * Update an existing post
     * @param int $post_id id of the specific post
     * @param string $post_text new text of the specific post
     * @return bool feedback (was the update successful ?)
     */
    public static function updatePost($post_id, $post_title, $post_text, $post_tags = '', $post_series = -1)
    {
        if (!$post_id || (!strlen($post_title) && !strlen($post_text) && !strlen($post_tags))) {
            Session::add('feedback_negative', "Title was: '$post_title', text was: '$post_text'");
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sets = '';
        if (strlen($post_title)) $sets .= 'title = :post_title';
        if (strlen($post_text)) {
            if (strlen($sets) > 0) $sets .= ', ';
            $sets .= 'text = :post_text';
        }
        if (strlen($post_tags)) {
            if (strlen($sets) > 0) $sets .= ', ';
            $sets .= 'tags = :post_tags';
        }
        if (strlen($sets) === 0) return false;

        $sql = "UPDATE posts SET $sets WHERE id = :post_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        if (strlen($post_title)) $query->bindParam(':post_title', $post_title, PDO::PARAM_STR);
        if (strlen($post_text)) $query->bindParam(':post_text', $post_text, PDO::PARAM_STR);
        if (strlen($post_tags)) $query->bindParam(':post_tags', $post_tags, PDO::PARAM_STR);
        $query->bindParam(':post_id', $post_id, PDO::PARAM_INT);
        $query->bindParam(':user_id', Session::get('user_id'), PDO::PARAM_INT);
        $query->execute();

        if ($query->rowCount() == 1) {
            SeriesPostModel::createSeriesPost($post_id, $series_id);

            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function publishPost($post_id)
    {
        if (!$post_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE posts SET active = 1 WHERE id = :post_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':post_id' => $post_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    /**
     * Delete a specific post
     * @param int $post_id id of the post
     * @return bool feedback (was the post deleted properly ?)
     */
    public static function deletePost($post_id)
    {
        if (!$post_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM posts WHERE id = :post_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':post_id' => $post_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
