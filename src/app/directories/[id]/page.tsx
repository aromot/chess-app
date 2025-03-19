import EditDirectory from "@/components/chess/edit/EditDirectory";
import { getDirectory } from "@/app/directories/_db/db-queries";
import { Directory } from "@prisma/client";
import { checkAuth } from "@/lib/helpers";

type Props = {
  params: Promise<{ id: string }>;
};

const DirectoryPage = async ({ params }: Props) => {
  await checkAuth();
  const id = parseInt((await params).id);
  const directory = (await getDirectory(id)) as Directory;

  console.log({ directory });

  return <EditDirectory directory={directory} />;
};

export default DirectoryPage;
