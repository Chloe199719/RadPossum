/*
  Warnings:

  - The `public_or_private` column on the `booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `public_or_private` on table `LessonCodes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LessonCodes" ALTER COLUMN "public_or_private" SET NOT NULL;

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "public_or_private",
ADD COLUMN     "public_or_private" "Privacy" NOT NULL DEFAULT 'Public';
