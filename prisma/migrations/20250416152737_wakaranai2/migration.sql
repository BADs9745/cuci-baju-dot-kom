-- DropForeignKey
ALTER TABLE "login_sessions" DROP CONSTRAINT "login_sessions_userId_fkey";

-- AddForeignKey
ALTER TABLE "login_sessions" ADD CONSTRAINT "login_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
