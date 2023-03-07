/*
  Warnings:

  - Added the required column `paypal_order_logsId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LessonCodes_userID_key";

-- DropIndex
DROP INDEX "booking_userID_key";

-- DropIndex
DROP INDEX "paypal_order_codes_logs_shopId_key";

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "paypal_order_logsId" TEXT NOT NULL;
