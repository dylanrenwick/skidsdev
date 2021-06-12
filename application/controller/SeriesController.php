<?php

class SeriesController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {

    }

    public function create()
    {
        $name = Request::get('name');
        Auth::checkAuthentication();
        SeriesModel::createSeries($name);
        $newSeries = SeriesModel::getSeriesByName($name);
        $this->View->renderJSON(array(
            'id' => $newSeries->id,
            'name' => $newSeries->name
        ));
    }

    public function delete()
    {
        $id = Request::get('id');
        Auth::checkAuthentication();
        $this->View->renderJSON(array(
            'result' => SeriesModel::deleteSeries($id)
        ));
    }
}