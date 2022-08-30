ALTER TABLE `user` ADD COLUMN `email` VARCHAR(255) NOT NULL;
ALTER TABLE `user` RENAME COLUMN `name` to `nickname`;
ALTER TABLE `user` MODIFY `nickname` VARCHAR(255) NULL;
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(255) NOT NULL;

DROP INDEX `user_name_key` ON `user`;
