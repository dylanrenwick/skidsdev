<?php

class WikiPageModel
{
    public static function loadPage($path_parts)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $page_name = array_pop($path_parts);
        $page_path = implode('/', $path_parts);

        $sql = "SELECT page_filepath, page_title FROM wiki_pages WHERE page_name = :page_name AND page_path = :page_path";
        $query = $database->prepare($sql);
        $query->execute(array(
            ':page_name' => $page_name, ':page_path' => $page_path
        ));

        $page = $query->fetch();

        if ($query->rowCount() == 1) {
            $page_filepath = $page->page_filepath;
            $page_title = $page->page_title;
            return array(
                'wiki_page_filepath' => $page_filepath,
                'wiki_page_path' => $page_path,
                'wiki_page_name' => $page_name,
                'wiki_page_title' => $page_title
            );
        } else {
            return false;
        }
    }
}