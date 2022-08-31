ALTER TABLE `message` DROP FOREIGN KEY `message_user_id_fkey`;
DROP INDEX `message_user_id_key` ON `message`;

ALTER TABLE `message` ADD CONSTRAINT `message_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;