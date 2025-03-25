import { prisma } from "@/lib/db";

export async function insertMove(
  directoryId: number,
  san: string,
  squareFrom: string,
  squareTo: string,
  positionId: number,
  nextPositionId: number | null = null
) {
  const move = await prisma.move.create({
    data: {
      directoryId,
      san,
      squareFrom,
      squareTo,
      positionId,
      nextPositionId,
    },
  });

  return move;
}

export async function findMoveOrThrow(id: number) {
  return await prisma.move.findUniqueOrThrow({
    where: {
      id,
    },
  });
}

export async function selectMovesOfDirectory(directoryId: number) {
  return await prisma.move.findMany({
    where: {
      directoryId,
    },
  });
}

export async function deleteMoves(moveIds: number[]) {
  return await prisma.move.deleteMany({
    where: {
      id: {
        in: moveIds,
      },
    },
  });
}
