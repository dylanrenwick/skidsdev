<?php

/**
 * Class DatabaseFactory
 *
 * Use it like this:
 * $database = DatabaseFactory::getFactory()->getConnection();
 *
 * That's my personal favourite when creating a database connection.
 * It's a slightly modified version of Jon Raphaelson's excellent answer on StackOverflow:
 * http://stackoverflow.com/questions/130878/global-or-singleton-for-database-connection
 *
 * Full quote from the answer:
 *
 * "Then, in 6 months when your app is super famous and getting dugg and slashdotted and you decide you need more than
 * a single connection, all you have to do is implement some pooling in the getConnection() method. Or if you decide
 * that you want a wrapper that implements SQL logging, you can pass a PDO subclass. Or if you decide you want a new
 * connection on every invocation, you can do do that. It's flexible, instead of rigid."
 *
 * Thanks! Big up, mate!
 */
class DatabaseFactory
{
    private static DatabaseFactory $factory;
    private PDO $database;

    public static function getFactory(): DatabaseFactory
    {
        if (!isset(self::$factory)) {
            self::$factory = new DatabaseFactory();
        }
        return self::$factory;
    }

    public function getConnection(): PDO {
        if (!isset($this->database)) {

            /**
             * Check DB connection in try/catch block. Also when PDO is not constructed properly,
             * prevent to exposing database host, username and password in plain text as:
             * PDO->__construct('mysql:host=127....', 'root', '12345678', Array)
             * by throwing custom error message
             */
            try {
				$options = [
					PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
					PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING
				];
				$this->database = self::createDatabase($options);
			} catch (PDOException $e) {
                // Echo custom message. Echo error code gives you some info.
                echo 'Database connection can not be estabilished. Please try again later.' . '<br>';
                echo 'Error code: ' . $e->getCode() . '<br>';
                echo 'Error: ' . $e->getMessage();

                // Stop application :(
                // No connection, reached limit connections etc. so no point to keep it running
                exit;
            }
        }
        return $this->database;
    }

	private static function createDatabase(array $options): PDO {
		$dbType = Config::get('DB_TYPE');
		switch ($dbType) {
			case 'sqlite':
				return new PDO(
                   Config::get('DB_TYPE') . ':' . Config::get('DB_HOST'),
                   null, null, $options
                );
			case 'mysql':
				return new PDO(
                   Config::get('DB_TYPE') . ':host=' . Config::get('DB_HOST') . ';dbname=' .
                   Config::get('DB_NAME') . ';port=' . Config::get('DB_PORT') . ';charset=' . Config::get('DB_CHARSET'),
                   Config::get('DB_USER'), Config::get('DB_PASS'), $options
                );
			default:
				throw new Exception('Database type not supported');
		}
	}
}
