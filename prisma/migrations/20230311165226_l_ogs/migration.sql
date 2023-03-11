-- CreateTable
CREATE TABLE "commentsOLD" (
    "id" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    "parentID" TEXT,
    "message" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,

    CONSTRAINT "commentsOLD_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commentsOLD_id_key" ON "commentsOLD"("id");

-- AddForeignKey
ALTER TABLE "commentsOLD" ADD CONSTRAINT "commentsOLD_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentsOLD" ADD CONSTRAINT "commentsOLD_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
