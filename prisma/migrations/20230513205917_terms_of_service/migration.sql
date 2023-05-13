-- CreateTable
CREATE TABLE "Terms" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Terms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Terms_id_key" ON "Terms"("id");
