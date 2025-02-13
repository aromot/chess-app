import { prisma } from "@/lib/db";

export async function insertMove(
  san: string,
  positionId: number,
  nextPositionId: number | null = null
) {
  const move = await prisma.move.create({
    data: {
      san,
      positionId,
      nextPositionId,
    },
  });

  console.log("new move (db-queries):", move);

  return move;
}
