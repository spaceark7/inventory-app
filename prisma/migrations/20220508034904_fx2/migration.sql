/*
  Warnings:

  - You are about to drop the column `userId` on the `access_level` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `access_level` DROP FOREIGN KEY `access_level_userId_fkey`;

-- AlterTable
ALTER TABLE `access_level` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_access_levelTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_access_levelTouser_AB_unique`(`A`, `B`),
    INDEX `_access_levelTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_access_levelTouser` ADD CONSTRAINT `_access_levelTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `access_level`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_access_levelTouser` ADD CONSTRAINT `_access_levelTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
