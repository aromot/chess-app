import { prisma } from "@/lib/db";

export async function addPosition(directoryId: number, fen: string) {
  const position = await prisma.position.create({
    data: {
      directoryId,
      fen,
    },
  });

  return position;
}

export async function deletePositionsByDirectoryId(directoryId: number) {
  return await prisma.position.deleteMany({
    where: {
      directoryId,
    },
  });
}

export async function selectPositionsOfDirectory(directoryId: number) {
  return await prisma.position.findMany({
    where: {
      directoryId,
    },
  });
}
