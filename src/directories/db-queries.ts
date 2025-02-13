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
export async function addDirectory(data: { name: string; white: boolean }) {
  const directory = await prisma.directory.create({
    data: {
      name: data.name,
      white: data.white,
    },
  });
  return directory;
}

// Supprimer un directory par son ID
export async function deleteDirectory(id: number) {
  const directory = await prisma.directory.delete({
    where: {
      id,
    },
  });
  return directory;
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
