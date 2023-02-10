<?php

class LetterModel
{
    public static function getLetterByUUID($uuid)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT letter_date, letter_contents
                FROM letters WHERE letter_uuid = :letter_uuid LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':letter_uuid' => $uuid));

        $letter = $query->fetch();

        if ($query->rowCount() < 1) {
            Session::add('feedback_negative', Text::get('FEEDBACK_LETTER_DOES_NOT_EXIST'));
        }

        return $letter;
    }

    public static function createLetter($letter_text, $letter_date)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $letter_uuid = UUID::v4();

        $sql = "INSERT INTO letters (letter_uuid, letter_date, letter_contents) VALUES (:letter_uuid, :letter_date, :letter_contents)";
        $query = $database->prepare($sql);
        $query->execute(array(
            ':letter_uuid' => $letter_uuid,
            ':letter_date' => $letter_date,
            ':letter_contents' => $letter_text
        ));

        if 
    }
}