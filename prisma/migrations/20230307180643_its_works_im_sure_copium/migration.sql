/*
  Warnings:

  - You are about to drop the column `item_bought` on the `paypal_order_codes_logs` table. All the data in the column will be lost.
  - Added the required column `shopID` to the `paypal_order_codes_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paypal_order_codes_logs" DROP COLUMN "item_bought",
ADD COLUMN     "shopID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "paypal_order_codes_logs" ADD CONSTRAINT "paypal_order_codes_logs_shopID_fkey" FOREIGN KEY ("shopID") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
