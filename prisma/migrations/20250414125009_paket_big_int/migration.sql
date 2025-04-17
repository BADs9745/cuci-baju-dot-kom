/*
  Warnings:

  - You are about to alter the column `pricePerUnit` on the `packages` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "packages" ALTER COLUMN "pricePerUnit" SET DATA TYPE BIGINT;
