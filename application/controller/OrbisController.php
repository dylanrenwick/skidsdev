<?php

class OrbisController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function wiki()
    {
        if (count($this->requestRoute) == 0) $this->requestRoute = array('main_page');
        $page_data = WikiPageModel::loadPage($this->requestRoute);
        if ($page_data === false) {
            header('HTTP/1.0 404 Not Found', true, 404);
            $this->View->render('error/404');
            return;
        }

        $this->View->render('wiki/page', $page_data);
    }

    public function edit()
    {
        if (count($this->requestRoute) == 0) $this->requestRoute = array('main_page');
        $page_data = WikiPageModel::loadPage($this->requestRoute);
        $data = array(
            'wiki_page_name' => array_pop($this->requestRoute),
            'wiki_page_path' => implode('/', $this->requestRoute)
        );
        if ($page_data === false) {
            $data['wiki_page_filepath'] = null;
        } else {
            $data = $page_data;
        }

        $this->View->render('wiki/edit', $data);
    }
    
    public function preview()
    {
        $this->View->renderWikiPage(Request::post('text'));
    }
}