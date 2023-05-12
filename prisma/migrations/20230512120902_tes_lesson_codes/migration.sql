/*
  Warnings:

  - The `public_or_private` column on the `LessonCodes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('Public', 'Private');

-- AlterTable
ALTER TABLE "LessonCodes" DROP COLUMN "public_or_private",
ADD COLUMN     "public_or_private" "Privacy" DEFAULT 'Public';
