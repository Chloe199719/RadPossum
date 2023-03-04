/*
  Warnings:

  - You are about to drop the `ExercicesOnLessons` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `SocialMedia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `hero` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `messages` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ExercicesOnLessons" DROP CONSTRAINT "ExercicesOnLessons_exerciceId_fkey";

-- DropForeignKey
ALTER TABLE "ExercicesOnLessons" DROP CONSTRAINT "ExercicesOnLessons_lessonId_fkey";

-- DropTable
DROP TABLE "ExercicesOnLessons";

-- CreateTable
CREATE TABLE "_exerciceTolessons" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_exerciceTolessons_AB_unique" ON "_exerciceTolessons"("A", "B");

-- CreateIndex
CREATE INDEX "_exerciceTolessons_B_index" ON "_exerciceTolessons"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_id_key" ON "Questions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_id_key" ON "SocialMedia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hero_id_key" ON "hero"("id");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_id_key" ON "lessons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "messages_id_key" ON "messages"("id");

-- AddForeignKey
ALTER TABLE "_exerciceTolessons" ADD CONSTRAINT "_exerciceTolessons_A_fkey" FOREIGN KEY ("A") REFERENCES "exercice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_exerciceTolessons" ADD CONSTRAINT "_exerciceTolessons_B_fkey" FOREIGN KEY ("B") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
