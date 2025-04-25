/*
  Warnings:

  - You are about to drop the `_tat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_tat" DROP CONSTRAINT "_tat_A_fkey";

-- DropForeignKey
ALTER TABLE "_tat" DROP CONSTRAINT "_tat_B_fkey";

-- DropTable
DROP TABLE "_tat";

-- CreateTable
CREATE TABLE "_CucianOrderToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CucianOrderToService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CucianOrderToService_B_index" ON "_CucianOrderToService"("B");

-- AddForeignKey
ALTER TABLE "_CucianOrderToService" ADD CONSTRAINT "_CucianOrderToService_A_fkey" FOREIGN KEY ("A") REFERENCES "cucian_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CucianOrderToService" ADD CONSTRAINT "_CucianOrderToService_B_fkey" FOREIGN KEY ("B") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
