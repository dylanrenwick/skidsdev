CREATE TABLE IF NOT EXISTS `huge`.`posts` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `title` text NOT NULL,
 `text` text NOT NULL,
 `tags` text DEFAULT '',
 `categories` text DEFAULT '',
 `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
 `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
