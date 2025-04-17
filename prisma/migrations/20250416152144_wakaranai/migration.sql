/*
  Warnings:

  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryMethod` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `settingValue` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `userRoleId` on the `users` table. All the data in the column will be lost.
  - Added the required column `value` to the `OrderPriority` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NotificationType` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DeliveryMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ServiceCategory` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userRoleId_fkey";

-- AlterTable
ALTER TABLE "OrderPriority" ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "type",
ADD COLUMN     "NotificationType" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "status",
ADD COLUMN     "OrderItemStatus" "OrderItemStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "deliveryMethod",
ADD COLUMN     "DeliveryMethod" "DeliveryMethod" NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "category",
ADD COLUMN     "ServiceCategory" "ServiceCategory" NOT NULL;

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "description",
DROP COLUMN "settingValue";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userRoleId",
ADD COLUMN     "UserRoleId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_UserRoleId_fkey" FOREIGN KEY ("UserRoleId") REFERENCES "user_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
