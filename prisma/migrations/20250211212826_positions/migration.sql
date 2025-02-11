-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "directoryId" INTEGER NOT NULL,
    "SAN" TEXT,
    "FEN" TEXT NOT NULL,
    "parentPos" INTEGER,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);
