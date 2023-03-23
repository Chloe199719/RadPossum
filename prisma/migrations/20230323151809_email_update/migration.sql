/*
  Warnings:

  - A unique constraint covering the columns `[discord]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_userID_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discord" TEXT;

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_discord_key" ON "User"("discord");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
