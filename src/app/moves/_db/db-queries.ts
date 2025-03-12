import { prisma } from "@/lib/db";

export async function insertMove(
  directoryId: number,
  san: string,
  positionId: number,
  nextPositionId: number | null = null
) {
  const move = await prisma.move.create({
    data: {
      directoryId,
      san,
      positionId,
      nextPositionId,
    },
  });

  console.log("new move (db-queries):", move);

  return move;
}
