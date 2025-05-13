-- AlterTable
ALTER TABLE "user_roles" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "authority_level" INTEGER NOT NULL DEFAULT 0;
