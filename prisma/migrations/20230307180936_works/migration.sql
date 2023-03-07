/*
  Warnings:

  - Made the column `duration` on table `shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `privacy` on table `shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shop" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "privacy" SET NOT NULL;
