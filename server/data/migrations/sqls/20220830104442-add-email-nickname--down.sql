ALTER TABLE `user` ADD UNIQUE `user_name_key`(`nickname`);
ALTER TABLE `user` DROP COLUMN `password`;
ALTER TABLE `user` MODIFY `nickname` VARCHAR(255) NOT NULL;
ALTER TABLE `user` RENAME COLUMN `nickname` to `name`;
ALTER TABLE `user` DROP COLUMN `email`;