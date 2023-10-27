/*
  Warnings:

  - You are about to drop the column `ingredient` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `ingredient`;

-- CreateTable
CREATE TABLE `Ingredients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredientName` VARCHAR(191) NOT NULL,
    `ingredientAmount` INTEGER NOT NULL,
    `ingredientMeasurementUnit` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ingredientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ingredients` ADD CONSTRAINT `Ingredients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
