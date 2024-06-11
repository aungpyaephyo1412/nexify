-- CreateTable
CREATE TABLE "Following" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
