import { checkAuth } from "@/lib/helpers";
import { getFullDirectory } from "../../_db/db-queries";
import { Directory } from "@prisma/client";
import TrainDirectory from "@/components/chess/training/TrainDirectory";

type Props = {
  params: Promise<{ id: string }>;
};

const TrainingPage = async ({ params }: Props) => {
  await checkAuth();
  const id = parseInt((await params).id);
  const directory = (await getFullDirectory(id)) as Directory;

  return <TrainDirectory directory={directory} />;
};

export default TrainingPage;
