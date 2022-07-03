-- AlterTable
ALTER TABLE `product` ADD COLUMN `update_user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_update_user_id_fkey` FOREIGN KEY (`update_user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
