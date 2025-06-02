-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_UserRoleId_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_UserRoleId_fkey" FOREIGN KEY ("UserRoleId") REFERENCES "user_roles"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
