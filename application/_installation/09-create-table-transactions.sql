CREATE TABLE IF NOT EXISTS `huge`.`transactions` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`amount` decimal(10,2) NOT NULL,
	`description` text NOT NULL,
	`date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`category_id` int(11) unsigned NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`category_id`) REFERENCES `huge`.`transaction_categories` (`id`) ON UPDATE CASCADE,
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
