/*
  Warnings:

  - Added the required column `commentID` to the `commentsOLD` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commentsOLD" ADD COLUMN     "commentID" TEXT NOT NULL;
