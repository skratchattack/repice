/*
  Warnings:

  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ingredients` DROP FOREIGN KEY `Ingredients_ingredientId_fkey`;

-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `ingredients` JSON NULL;

-- DropTable
DROP TABLE `Ingredients`;
