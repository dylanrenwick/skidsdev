<?php

class SeriesPostModel
{
    public static function createSeriesPost($post_id, $series_id, $next_post = -1, $prev_post = -1)
    {
        if ($series_id < 0) return true;

        $params = array(
            ':post_id' => $post_id,
            ':series_id' => $series_id,
            ':next_post' => $next_post,
            ':prev_post' => $prev_post
        );

        $results = Database::query("SELECT id, next_post, prev_post FROM series_posts WHERE post_id = :post_id AND series_id = :series_id", $params);

        if ($results->rowCount() == 0) {
            $results = Database::query("SELECT id FROM series_posts WHERE post_id = :post_id", $params);
            if ($results->rowCount() > 0) {
                Database::query("DELETE FROM series_posts WHERE post_id = :post_id", $params);
            }
            $results = Database::query("INSERT INTO series_posts (post_id, series_id) VALUES (:post_id, :series_id)", $params);
            return $results->rowCount() > 0;
        } else {
            $result = $results->fetch();
            if ($result->next_post !== $next_post || $result->prev_post !== $prev_post) {
                $results = Database::query("UPDATE series_posts SET next_post = :next_post, prev_post = :prev_post WHERE post_id = :post_id AND series_id = :series_id", $params);
                return $results->rowCount() > 0;
            }
        }

        return true;
    }

    public static function getSeriesInfoByPost($post_id)
    {
        $series_info = array(
            'prev' => null,
            'next' => null,
            'series' => null
        );
        $results = Database::query("SELECT series_id, next_post, prev_post FROM series_posts WHERE post_id = :post_id", array(':post_id' => $post_id));
        if ($results->rowCount() > 0) {
            $result = $results->fetch();

            $series_results = Database::query("SELECT id, name FROM series WHERE id = :series_id", array(':series_id' => $result->series_id));
            if ($series_results->rowCount() == 0) return $series_info;
            $series_info['series'] = $series_results->fetch();
            
            $prev_results = Database::query("SELECT post_id FROM series_posts WHERE id = :prev_post", array(':prev_post' => $result->prev_post));
            $next_results = Database::query("SELECT post_id FROM series_posts WHERE id = :next_post", array(':next_post' => $result->next_post));
            if ($prev_results->rowCount() > 0) $series_info['prev'] = PostModel::getPost($prev_results->fetch()->post_id);
            if ($next_results->rowCount() > 0) $series_info['next'] = PostModel::getPost($next_results->fetch()->post_id);
        }
        return $series_info;
    }

    public static function deleteByPost($post_id)
    {
        Database::query("DELETE FROM series_posts WHERE post_id = :post_id", array(':post_id' => $post_id));
    }
}