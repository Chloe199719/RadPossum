/*
  Warnings:

  - A unique constraint covering the columns `[time]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - Made the column `time` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lessons" ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "lessons_time_key" ON "lessons"("time");
