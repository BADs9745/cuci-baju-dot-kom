/*
  Warnings:

  - You are about to drop the column `guestId` on the `cucian_orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cucian_orders" DROP COLUMN "guestId",
ADD COLUMN     "userIndentifier" TEXT;
