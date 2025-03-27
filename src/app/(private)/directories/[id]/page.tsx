import EditDirectory from "@/components/chess/edit/EditDirectory";
import { Directory } from "@prisma/client";
import { checkAuth } from "@/lib/helpers";
import { getDirectory } from "../_db/db-queries";

type Props = {
  params: Promise<{ id: string }>;
};

const DirectoryPage = async ({ params }: Props) => {
  await checkAuth();
  const id = parseInt((await params).id);
  const directory = (await getDirectory(id)) as Directory;

  return <EditDirectory directory={directory} />;
};

export default DirectoryPage;
