/*
  Warnings:

  - A unique constraint covering the columns `[hour]` on the table `avaiable_hours` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `hour` on the `avaiable_hours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "avaiable_hours" DROP COLUMN "hour",
ADD COLUMN     "hour" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "avaiable_hours_hour_key" ON "avaiable_hours"("hour");
