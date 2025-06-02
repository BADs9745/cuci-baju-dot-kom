/*
  Warnings:

  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory_transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_inventoryCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "inventory_transactions" DROP CONSTRAINT "inventory_transactions_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "inventory_transactions" DROP CONSTRAINT "inventory_transactions_recordedById_fkey";

-- DropForeignKey
ALTER TABLE "login_sessions" DROP CONSTRAINT "login_sessions_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "UserRoleId" SET DEFAULT 'unknown';

-- DropTable
DROP TABLE "inventory";

-- DropTable
DROP TABLE "inventory_categories";

-- DropTable
DROP TABLE "inventory_transactions";

-- AddForeignKey
ALTER TABLE "login_sessions" ADD CONSTRAINT "login_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
