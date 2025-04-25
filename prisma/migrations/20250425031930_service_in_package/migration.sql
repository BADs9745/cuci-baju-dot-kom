-- AlterTable
ALTER TABLE "services" ADD COLUMN     "packageId" TEXT;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
