import { prisma } from "@/lib/db";

// Récupérer tous les directories
export async function getDirectories() {
  const directories = await prisma.directory.findMany({
    orderBy: {
      createdAt: "asc", // Tri par date de création croissante
    },
  });
  return directories;
}

// Ajouter un nouveau directory
export async function addDirectory(data: {
  name: string;
  white: boolean;
  fenPosInit: string;
}) {
  const directory = await prisma.directory.create({
    data: {
      name: data.name,
      white: data.white,
      fenPosInit: data.fenPosInit,
      positions: {
        create: [
          {
            fen: data.fenPosInit,
          },
        ],
      },
    },
  });
  return directory;
}

// Supprimer un directory par son ID
// = supprimer le directory + toutes ses positions + tous ses moves.
export async function deleteDirectory(id: number) {
  const delDirectory = prisma.directory.delete({
    where: {
      id,
    },
  });

  const delPositions = prisma.position.deleteMany({
    where: {
      directoryId: id,
    },
  });

  const delMoves = prisma.move.deleteMany({
    where: {
      directoryId: id,
    },
  });

  await prisma.$transaction([delMoves, delPositions, delDirectory]);
}

// Mettre à jour un directory par son ID
export async function updateDirectory(
  id: number,
  data: { name?: string; white?: boolean }
) {
  const directory = await prisma.directory.update({
    where: {
      id,
    },
    data,
  });
  return directory;
}

export async function getDirectory(id: number) {
  const directory = await prisma.directory.findUnique({
    where: {
      id,
    },
    include: {
      Position: {
        include: {
          moves: true,
        },
      },
    },
  });
  return directory;
}
