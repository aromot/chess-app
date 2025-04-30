import EditDirectory from "@/components/chess/edit/EditDirectory";
import { Directory } from "@prisma/client";
import { checkAuth } from "@/lib/helpers";
import { getFullDirectory } from "../_db/db-queries";
import { redirect } from "next/navigation";
import { URLS } from "@/app/urls";

type Props = {
  params: Promise<{ id: string }>;
};

const DirectoryPage = async ({ params }: Props) => {
  const session = await checkAuth();
  const id = parseInt((await params).id);
  const directory = (await getFullDirectory(id)) as Directory;

  if (directory.userId !== session.user?.id) {
    redirect(URLS.dashboard);
  }

  return <EditDirectory directory={directory} />;
};

export default DirectoryPage;
