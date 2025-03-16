import AppChessboard from "@/components/chess/AppChessboard";
import { getDirectory } from "@/app/directories/_db/db-queries";
import { Directory } from "@prisma/client";
import { checkAuth } from "@/lib/helpers";

const DirectoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await checkAuth();
  const id = parseInt((await params).id);
  const directory = (await getDirectory(id)) as Directory;

  console.log({ directory });

  return <AppChessboard directory={directory} />;
};

export default DirectoryPage;
