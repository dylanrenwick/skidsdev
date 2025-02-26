<?php

class StuffController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function mcmods(): void
    {
        $this->View->render("stuff/mc-mods");
    }
}
