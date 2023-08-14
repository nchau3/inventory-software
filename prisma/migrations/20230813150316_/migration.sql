/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "createdAt",
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
