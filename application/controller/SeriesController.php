<?php

class SeriesController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(): void {}

    public function create(): void
    {
        $name = Request::get("name");
        Auth::checkAuthentication();
        SeriesModel::createSeries($name);
        $newSeries = SeriesModel::getSeriesByName($name);
        $this->View->renderJSON([
            "id" => $newSeries->id,
            "name" => $newSeries->name,
        ]);
    }

    public function delete(): void
    {
        $id = Request::get("id");
        Auth::checkAuthentication();
        $this->View->renderJSON([
            "result" => SeriesModel::deleteSeries($id),
        ]);
    }
}
