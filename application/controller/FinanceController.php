<?php

/**
 * The post controller: Just an example of simple create, read, update and delete (CRUD) actions.
 */
class FinanceController extends Controller
{
    public function __construct()
    {
        parent::__construct();

        // special authentication check for the entire controller: Note the check-ADMIN-authentication!
        // All methods inside this controller are only accessible for admins (= users that have role type 7)
        Auth::checkAdminAuthentication();
    }
    
    public function index(): void
    {
        $this->View->render('finance/index', [
            "sheets" => FinanceModel::getAllSheets()
        ]);
    }

    public function sheet(int $sheet_id): void
    {
        $sheet = FinanceModel::getSheet($sheet_id);
        if ($sheet === false) {
            $controller = new ErrorController();
            $controller->error404();
            return;
        }

        $this->View->renderMetaPreview($sheet->title, "", "");
        $this->View->render("finance/sheet", [
            "sheet" => $sheet,
            "transactions" => FinanceModel::getSheetTransactions($sheet_id)
        ]);
    }
}
