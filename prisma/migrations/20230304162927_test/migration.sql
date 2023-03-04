/*
  Warnings:

  - You are about to drop the `AudioOnResources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AudioOnResources" DROP CONSTRAINT "AudioOnResources_audioId_fkey";

-- DropForeignKey
ALTER TABLE "AudioOnResources" DROP CONSTRAINT "AudioOnResources_resourceId_fkey";

-- DropTable
DROP TABLE "AudioOnResources";

-- CreateTable
CREATE TABLE "_AudioToResources" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AudioToResources_AB_unique" ON "_AudioToResources"("A", "B");

-- CreateIndex
CREATE INDEX "_AudioToResources_B_index" ON "_AudioToResources"("B");

-- AddForeignKey
ALTER TABLE "_AudioToResources" ADD CONSTRAINT "_AudioToResources_A_fkey" FOREIGN KEY ("A") REFERENCES "Audio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioToResources" ADD CONSTRAINT "_AudioToResources_B_fkey" FOREIGN KEY ("B") REFERENCES "Resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
