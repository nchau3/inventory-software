/*
  Warnings:

  - You are about to drop the `Item_Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item_Location" DROP CONSTRAINT "Item_Location_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Item_Location" DROP CONSTRAINT "Item_Location_locationId_fkey";

-- DropTable
DROP TABLE "Item_Location";

-- CreateTable
CREATE TABLE "ItemLocation" (
    "itemId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemLocation_pkey" PRIMARY KEY ("itemId","locationId")
);

-- AddForeignKey
ALTER TABLE "ItemLocation" ADD CONSTRAINT "ItemLocation_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLocation" ADD CONSTRAINT "ItemLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
