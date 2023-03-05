/*
  Warnings:

  - Added the required column `bookedTime` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discordID` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_or_private` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "bookedTime" TEXT NOT NULL,
ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "discordID" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "public_or_private" TEXT NOT NULL,
ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
