<?php

class LetterController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {

    }

    public function letter()
    {
        $uuid = Request::get('id');

        $letter = LetterModel::getLetterByUUID($uuid);

        $this->View->render('letter/letter', array('letter' => $letter));
    }
}