/*
  Warnings:

  - You are about to drop the column `FEN` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `SAN` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `parentPosId` on the `Position` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fen]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fen` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "FEN",
DROP COLUMN "SAN",
DROP COLUMN "parentPosId",
ADD COLUMN     "fen" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "san" TEXT NOT NULL,
    "evaluation" JSONB,
    "positionId" INTEGER NOT NULL,
    "nextPositionId" INTEGER,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Position_fen_key" ON "Position"("fen");

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
