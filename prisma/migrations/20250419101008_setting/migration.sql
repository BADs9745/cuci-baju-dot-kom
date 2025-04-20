/*
  Warnings:

  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_updatedById_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Settings" JSONB;

-- DropTable
DROP TABLE "settings";
