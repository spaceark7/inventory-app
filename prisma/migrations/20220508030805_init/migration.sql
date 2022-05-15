-- DropForeignKey
ALTER TABLE `access_level` DROP FOREIGN KEY `access_level_userId_fkey`;

-- AlterTable
ALTER TABLE `access_level` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `access_level` ADD CONSTRAINT `access_level_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
