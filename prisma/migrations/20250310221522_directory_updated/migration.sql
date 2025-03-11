/*
  Warnings:

  - Added the required column `updatedAt` to the `Directory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Directory" ADD COLUMN     "fenPosInit" TEXT NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
