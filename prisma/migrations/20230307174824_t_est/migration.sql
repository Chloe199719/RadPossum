/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `LessonCodes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "shop" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "privacy" TEXT;

-- CreateTable
CREATE TABLE "paypal_order_codes_logs" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "item_bought" TEXT NOT NULL,

    CONSTRAINT "paypal_order_codes_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paypal_order_codes_logs_id_key" ON "paypal_order_codes_logs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "paypal_order_codes_logs_shopId_key" ON "paypal_order_codes_logs"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonCodes_userID_key" ON "LessonCodes"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "booking_userID_key" ON "booking"("userID");

-- AddForeignKey
ALTER TABLE "paypal_order_codes_logs" ADD CONSTRAINT "paypal_order_codes_logs_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
