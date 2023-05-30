CREATE TABLE IF NOT EXISTS `huge`.`posts` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`user_id` int(11) unsigned NOT NULL,
	`title` text NOT NULL,
	`text` text NOT NULL,
	`tags` text DEFAULT '',
	`categories` text DEFAULT '',
	`active` bit DEFAULT 0,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_post_author`
		FOREIGN KEY (user_id) REFERENCES users (id)
		ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
