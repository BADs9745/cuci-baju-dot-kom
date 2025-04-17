/*
  Warnings:

  - Made the column `UserRoleId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_UserRoleId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "UserRoleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_UserRoleId_fkey" FOREIGN KEY ("UserRoleId") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
