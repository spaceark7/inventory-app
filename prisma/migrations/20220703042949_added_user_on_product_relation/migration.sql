-- AlterTable
ALTER TABLE `product` ADD COLUMN `userId` INTEGER NULL,
    MODIFY `created_at` VARCHAR(255) NOT NULL,
    MODIFY `updated_at` VARCHAR(255) NOT NULL,
    MODIFY `deleted_at` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
