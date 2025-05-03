<?php

/**
 * FinanceModel
 * This is basically a simple CRUD (Create/Read/Update/Delete) demonstration.
 */
class FinanceModel
{
    public static function getAllSheets()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = <<<SQL
SELECT
    id,
    title,
    created_at,
    updated_at
FROM sheets
ORDER BY created_at DESC
SQL;
        $query = $database->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    public static function getSheet($sheet_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = <<<SQL
SELECT
        sheet.id,
        sheet.title,
        sheet.created_at,
        sheet.updated_at
FROM sheets AS sheet
WHERE id = :sheet_id
ORDER BY created_at DESC
LIMIT 1
SQL;
        $query = $database->prepare($sql);
        $query->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
        $query->execute();

        return $query->fetch();
    }

    public static function getSheetTransactions($sheet_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = <<<SQL
SELECT
    transaction.id,
    transaction.amount,
    transaction.date,
    transaction.description,
    category.name AS category_name
FROM transactions AS transaction
    INNER JOIN transaction_categories AS category
        ON transaction.category_id = category.id
WHERE sheet_id = :sheet_id
ORDER BY date DESC
SQL;
        $query = $database->prepare($sql);
        $query->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
        $query->execute();

        return $query->fetchAll();
    }

	public static function createSheet($sheet_title)
	{
		$database = DatabaseFactory::getFactory()->getConnection();

		$sql = "INSERT INTO sheets (title) VALUES (:sheet_title)";

        $query = $database->prepare($sql);
        $query->bindValue(':sheet_title', $sheet_title, PDO::PARAM_STR);
        $query->execute();

		if ($query->rowCount() == 1) {
			$sql = "SELECT id FROM sheets WHERE title = :sheet_title LIMIT 1";

			$query = $database->prepare($sql);
			$query->bindValue(':sheet_title', $sheet_title, PDO::PARAM_STR);
			$query->execute();

			$sheet_id = $query->fetch()->id;

			return $sheet_id;
		}

        // default return
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;

	}
}
