/*
  Warnings:

  - Added the required column `accessId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `accessId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `access_level` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access_type` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `access_level` ADD CONSTRAINT `access_level_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
