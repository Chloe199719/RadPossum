/*
  Warnings:

  - The `privacy` column on the `shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shop" DROP COLUMN "privacy",
ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'Public';
