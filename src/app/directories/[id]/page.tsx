import AppChessboard from "@/components/chess/AppChessboard";
import { getDirectory } from "@/app/directories/_db/db-queries";
import { Directory } from "@prisma/client";

const DirectoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const directory = (await getDirectory(id)) as Directory;

  console.log({ directory });

  return <AppChessboard directory={directory} />;
};

export default DirectoryPage;
