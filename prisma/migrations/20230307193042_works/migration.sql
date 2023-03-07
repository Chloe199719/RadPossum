/*
  Warnings:

  - You are about to drop the column `paypal_order_logsId` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "paypal_order_logsId",
ALTER COLUMN "message" DROP NOT NULL;
