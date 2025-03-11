import { prisma } from "@/lib/db";

export async function addPosition(directoryId: number, fen: string) {
  const position = await prisma.position.create({
    data: {
      directoryId,
      fen,
    },
  });

  console.log("new position (db-queries):", position);

  return position;
}

export async function deletePositionsByDirectoryId(directoryId: number) {
  return await prisma.position.deleteMany({
    where: {
      directoryId,
    },
  });
}
