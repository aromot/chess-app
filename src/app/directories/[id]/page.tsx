import AppChessboard from "@/components/chess/AppChessboard";
import { getDirectory } from "@/directories/db-queries";
import { Directory } from "@prisma/client";

const DirectoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const directory = (await getDirectory(id)) as Directory;

  console.log({ directory });

  return (
    <div>
      <AppChessboard directory={directory} />
    </div>
  );
};

export default DirectoryPage;
