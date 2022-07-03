-- AlterTable
ALTER TABLE `product` MODIFY `product_image` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `image_path` VARCHAR(255) NULL,
    MODIFY `created_at` VARCHAR(191) NULL,
    MODIFY `updated_at` VARCHAR(191) NULL;
