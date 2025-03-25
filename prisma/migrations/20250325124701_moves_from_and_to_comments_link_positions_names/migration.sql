/*
  Warnings:

  - Added the required column `directoryId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squareFrom` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squareTo` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "directoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "squareFrom" TEXT NOT NULL,
ADD COLUMN     "squareTo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "Directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
