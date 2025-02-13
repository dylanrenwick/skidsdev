<?php

/**
 * Class View
 * The part that handles all the output
 */
#[AllowDynamicProperties]
class View
{
    public $meta = [];
    public $component_args = [];

    /**
     * simply includes (=shows) the view. this is done from the controller. In the controller, you usually say
     * $this->view->render('help/index'); to show (in this example) the view index.php in the folder help.
     * Usually the Class and the method are the same like the view, but sometimes you need to show different views.
     * @param string $filename Path of the to-be-rendered view, usually folder/file(.php)
     * @param array $data Data to be used in the view
     */
    public function render(
        string $filename,
        ?array $data = null,
        bool $template = true
    ): void {
        self::renderFiles([$filename], $data, $template);
    }

    /**
     * Similar to render, but accepts an array of separate views to render between the header and footer. Use like
     * the following: $this->view->renderMulti(array('help/index', 'help/banner'));
     * @param array $filenames Array of the paths of the to-be-rendered view, usually folder/file(.php) for each
     * @param array $data Data to be used in the view
     */
    public function renderFiles(
        array $filenames,
        ?array $data = null,
        bool $template = true
    ): void {
        if ($data) {
            foreach ($data as $key => $value) {
                $this->{$key} = $value;
            }
        }
        if ($template) {
            $before_templates = Config::get("TEMPLATE_BEFORE");
            if ($before_templates) {
                foreach ($before_templates as $filename) {
                    require Config::get("PATH_VIEW") .
                        Config::get("PATH_TEMPLATE") .
                        $filename;
                }
            }
        }
        foreach ($filenames as $filename) {
            require Config::get("PATH_VIEW") . $filename . ".php";
        }
        if ($template) {
            $after_templates = Config::get("TEMPLATE_AFTER");
            if ($after_templates) {
                foreach ($after_templates as $filename) {
                    require Config::get("PATH_VIEW") .
                        Config::get("PATH_TEMPLATE") .
                        $filename;
                }
            }
        }
    }

    public function renderComponent(string $filename, array $args = []): void
    {
        $this->component_args = $args;
        require Config::get("PATH_VIEW") .
            Config::get("PATH_COMPONENT") .
            $filename .
            ".php";
    }

    public function renderMarkdown(string $text): void
    {
        $pd = new Parsedown();
        echo $pd->text($text);
    }

    public function renderWikiPage(string $text): void
    {
        echo WikiParser::parseWikiPage($text);
    }

    /**
     * Same like render(), but does not include header and footer
     * @param string $filename Path of the to-be-rendered view, usually folder/file(.php)
     * @param mixed $data Data to be used in the view
     */
    public function renderWithoutHeaderAndFooter(
        string $filename,
        ?array $data = null
    ): void {
        if ($data) {
            foreach ($data as $key => $value) {
                $this->{$key} = $value;
            }
        }

        require Config::get("PATH_VIEW") . $filename . ".php";
    }

    /**
     * Renders pure JSON to the browser, useful for API construction
     * @param $data
     */
    public function renderJSON(mixed $data): void
    {
        header("Content-Type: application/json");
        echo json_encode($data);
    }

    /**
     * renders the feedback messages into the view
     */
    public function renderFeedbackMessages(): void
    {
        // echo out the feedback messages (errors and success messages etc.),
        // they are in $_SESSION["feedback_positive"] and $_SESSION["feedback_negative"]
        require Config::get("PATH_VIEW") . "_templates/feedback.php";

        // delete these messages (as they are not needed anymore and we want to avoid to show them twice
        Session::set("feedback_positive", null);
        Session::set("feedback_negative", null);
    }

    public function renderMetaPreview(
        string $title,
        string $desc,
        string $image_url
    ): void {
        $this->meta = [
            "title" => $title,
            "desc" => $desc,
            "image" => $image_url,
        ];
    }

    /**
     * Checks if the passed string is the currently active controller.
     * Useful for handling the navigation's active/non-active link.
     *
     * @param string $filename
     * @param string $navigation_controller
     *
     * @return bool Shows if the controller is used or not
     */
    public static function checkForActiveController(
        string $filename,
        string $navigation_controller
    ): bool {
        $split_filename = explode("/", $filename);
        $active_controller = $split_filename[0];

        if ($active_controller == $navigation_controller) {
            return true;
        }

        return false;
    }

    /**
     * Checks if the passed string is the currently active controller-action (=method).
     * Useful for handling the navigation's active/non-active link.
     *
     * @param string $filename
     * @param string $navigation_action
     *
     * @return bool Shows if the action/method is used or not
     */
    public static function checkForActiveAction(
        string $filename,
        string $navigation_action
    ): bool {
        $split_filename = explode("/", $filename);
        $active_action = $split_filename[1];

        if ($active_action == $navigation_action) {
            return true;
        }

        return false;
    }

    /**
     * Checks if the passed string is the currently active controller and controller-action.
     * Useful for handling the navigation's active/non-active link.
     *
     * @param string $filename
     * @param string $navigation_controller_and_action
     *
     * @return bool
     */
    public static function checkForActiveControllerAndAction(
        string $filename,
        string $navigation_controller_and_action
    ): bool {
        $split_filename = explode("/", $filename);
        $active_controller = $split_filename[0];
        $active_action = $split_filename[1];

        $split_filename = explode("/", $navigation_controller_and_action);
        $navigation_controller = $split_filename[0];
        $navigation_action = $split_filename[1];

        if (
            $active_controller == $navigation_controller and
            $active_action == $navigation_action
        ) {
            return true;
        }

        return false;
    }

    /**
     * Converts characters to HTML entities
     * This is important to avoid XSS attacks, and attempts to inject malicious code in your page.
     *
     * @param  string $str The string.
     * @return string
     */
    public function encodeHTML(string $str): string
    {
        return htmlentities($str, ENT_QUOTES, "UTF-8");
    }
}
