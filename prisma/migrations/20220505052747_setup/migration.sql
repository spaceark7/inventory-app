/*
  Warnings:

  - You are about to drop the column `image_path` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `serial_number` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_SN]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `SKU` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_SN` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_name_key` ON `product`;

-- DropIndex
DROP INDEX `Product_serial_number_key` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `image_path`,
    DROP COLUMN `name`,
    DROP COLUMN `serial_number`,
    DROP COLUMN `sku`,
    ADD COLUMN `SKU` VARCHAR(255) NOT NULL,
    ADD COLUMN `product_SN` VARCHAR(255) NOT NULL,
    ADD COLUMN `product_image` VARCHAR(255) NOT NULL,
    ADD COLUMN `product_name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_product_name_key` ON `Product`(`product_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_product_SN_key` ON `Product`(`product_SN`);
