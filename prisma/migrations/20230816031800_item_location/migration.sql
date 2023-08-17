/*
  Warnings:

  - You are about to drop the `_ItemToLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemToLocation" DROP CONSTRAINT "_ItemToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToLocation" DROP CONSTRAINT "_ItemToLocation_B_fkey";

-- DropTable
DROP TABLE "_ItemToLocation";

-- CreateTable
CREATE TABLE "Item_Location" (
    "itemId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Item_Location_pkey" PRIMARY KEY ("itemId","locationId")
);

-- AddForeignKey
ALTER TABLE "Item_Location" ADD CONSTRAINT "Item_Location_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_Location" ADD CONSTRAINT "Item_Location_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
