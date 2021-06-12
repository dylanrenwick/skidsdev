<?php

class GameController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        Redirect::to('');
    }

    public function click()
    {
        $this->View->render('game/click');
    }

    public function canvity()
    {
        $this->View->render('game/canvity');
    }
}
