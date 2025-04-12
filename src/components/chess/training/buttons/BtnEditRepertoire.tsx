import { URLS } from "@/app/urls";
import { Button } from "@/components/ui/button";
import { formatUrl } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useTraining } from "../TrainingProvider";

type Props = {
  size?: "default" | "sm";
};
const BtnEditRepertoire = ({ size = "default" }: Props) => {
  const { directory } = useTraining();
  const router = useRouter();

  return (
    <Button
      size={size}
      onClick={() => {
        router.push(formatUrl(URLS.editDirectory, { id: directory.id }));
      }}
    >
      Edit repertoire
    </Button>
  );
};

export default BtnEditRepertoire;
