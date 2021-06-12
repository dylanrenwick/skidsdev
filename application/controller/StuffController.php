<?php

class StuffController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /*public function index()
    {
        $this->View->render('stuff/index');
    }*/

    public function essays()
    {
        $this->View->render('stuff/essays', array(
            'channels' => EssayChannelModel::getActiveChannelsByCategory()
        ));
    }
}