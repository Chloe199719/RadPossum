/*
  Warnings:

  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN;

-- CreateTable
CREATE TABLE "paypal_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "privacy" TEXT NOT NULL,
    "price_standard" TEXT NOT NULL,
    "price_saturday" TEXT NOT NULL,

    CONSTRAINT "paypal_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripes_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "saturdayPriceID" TEXT NOT NULL,
    "normalPriceID" TEXT NOT NULL,
    "prodID" TEXT NOT NULL,
    "privacy" TEXT NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "stripes_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "paypal_price" TEXT NOT NULL,
    "stripes_ID" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paypal_items_id_key" ON "paypal_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stripes_items_id_key" ON "stripes_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shop_id_key" ON "shop"("id");
