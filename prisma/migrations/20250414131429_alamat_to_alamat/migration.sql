/*
  Warnings:

  - You are about to drop the column `Alamat` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Alamat",
ADD COLUMN     "alamat" TEXT;
