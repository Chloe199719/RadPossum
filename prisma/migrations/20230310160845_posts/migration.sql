/*
  Warnings:

  - A unique constraint covering the columns `[postID]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postID` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "postID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "comments_postID_key" ON "comments"("postID");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
