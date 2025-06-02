-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_UserRoleId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "UserRoleId" DROP NOT NULL,
ALTER COLUMN "UserRoleId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_UserRoleId_fkey" FOREIGN KEY ("UserRoleId") REFERENCES "user_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
