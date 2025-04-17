/*
  Warnings:

  - You are about to drop the `Ayam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderPriority` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_customerId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_handledById_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderPriorityId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderStatusId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- DropTable
DROP TABLE "Ayam";

-- DropTable
DROP TABLE "OrderPriority";

-- DropTable
DROP TABLE "OrderStatus";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "notifications";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "orders";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "OrderItemStatus";

-- CreateTable
CREATE TABLE "cucian_orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "nama" TEXT NOT NULL,
    "alamat" TEXT,
    "phone" TEXT,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "cucian_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cucian_orders" ADD CONSTRAINT "cucian_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cucian_orders" ADD CONSTRAINT "cucian_orders_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
