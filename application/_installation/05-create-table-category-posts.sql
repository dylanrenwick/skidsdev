CREATE TABLE IF NOT EXISTS `huge`.`category_posts` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `category_id` int(11) unsigned NOT NULL,
 `post_id` int(11) unsigned NOT NULL,
 PRIMARY KEY (`id`),
 CONSTRAINT `fk_post_id`
  FOREIGN KEY (post_id) REFERENCES posts (id)
  ON UPDATE RESTRICT,
 CONSTRAINT `fk_category_id`
  FOREIGN KEY (category_id) REFERENCES categories (id)
  ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
