/*
  Warnings:

  - Made the column `time` on table `booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT;
