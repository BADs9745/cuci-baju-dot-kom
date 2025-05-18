/*
  Warnings:

  - Made the column `tahap` on table `cucian_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cucian_orders" ALTER COLUMN "tahap" SET NOT NULL,
ALTER COLUMN "tahap" SET DEFAULT 0;
