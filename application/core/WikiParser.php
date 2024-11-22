<?php

class WikiParser {
    public static function parseWikiPage(string $text_content): string
    {
        $text_content = WikiParser::parseWikiTags($text_content);

        $pd = new Parsedown();
        return $pd->text($text_content);
    }

    static function parseWikiTags(string $text_content): string
    {
        $text_content = preg_replace_callback_array(array(
            '/\[\[([a-zA-Z0-9\-_\(\)\/]+)\]\]/' => function ($match) {
                $path_parts = explode('/', $match[1]);
                $page_data = WikiPageModel::loadPage($path_parts);
                if ($page_data !== false) {
                    $url = Config::get('URL') . 'orbis/wiki/' . $match[1];
                    $title = $page_data['wiki_page_title'];
                    return "[$url]($title)";
                } else {
                    $url = Config::get('URL') . 'orbis/edit/' . $match[1];
                    $title = array_pop($path_parts);
                    return "<a href='$url' class='wiki-dead-link'>$title</a>";
                }
            }
        ), $text_content);
        return $text_content;
    }
}
