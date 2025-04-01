import { URLS } from "@/app/urls";
import { Button } from "@/components/ui/button";
import { formatUrl } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useTraining } from "../TrainingProvider";

const BtnEditRepertoire = () => {
  const { directory } = useTraining();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(formatUrl(URLS.editDirectory, { id: directory.id }));
      }}
    >
      Edit your repertoire
    </Button>
  );
};

export default BtnEditRepertoire;
