-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "updatedAT" DROP DEFAULT;

-- AlterTable
ALTER TABLE "commentsOLD" ALTER COLUMN "updatedAT" DROP DEFAULT;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "updatedAT" DROP DEFAULT;
