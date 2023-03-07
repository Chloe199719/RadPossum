/*
  Warnings:

  - You are about to drop the column `shopId` on the `paypal_order_codes_logs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonCodeID]` on the table `paypal_order_codes_logs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lessonCodeID` to the `paypal_order_codes_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "paypal_order_codes_logs" DROP CONSTRAINT "paypal_order_codes_logs_shopId_fkey";

-- AlterTable
ALTER TABLE "paypal_order_codes_logs" DROP COLUMN "shopId",
ADD COLUMN     "lessonCodeID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "paypal_order_codes_logs_lessonCodeID_key" ON "paypal_order_codes_logs"("lessonCodeID");

-- AddForeignKey
ALTER TABLE "paypal_order_codes_logs" ADD CONSTRAINT "paypal_order_codes_logs_lessonCodeID_fkey" FOREIGN KEY ("lessonCodeID") REFERENCES "LessonCodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
