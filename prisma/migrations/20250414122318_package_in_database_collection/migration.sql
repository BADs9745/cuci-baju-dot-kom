/*
  Warnings:

  - You are about to drop the column `unitType` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "unitType";

-- DropEnum
DROP TYPE "UnitType";

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pricePerUnit" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);
