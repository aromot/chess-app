import { checkAuth } from "@/lib/helpers";
import { getFullDirectory } from "../../_db/db-queries";
import { Directory } from "@prisma/client";
import TrainDirectory from "@/components/chess/training/TrainDirectory";
import { redirect } from "next/navigation";
import { URLS } from "@/app/urls";

type Props = {
  params: Promise<{ id: string }>;
};

const TrainingPage = async ({ params }: Props) => {
  const session = await checkAuth();
  const id = parseInt((await params).id);
  const directory = (await getFullDirectory(id)) as Directory;

  if (directory.userId !== session.user?.id) {
    redirect(URLS.dashboard);
  }

  return <TrainDirectory directory={directory} />;
};

export default TrainingPage;
