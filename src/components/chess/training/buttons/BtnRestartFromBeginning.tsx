import { Button } from "@/components/ui/button";
import { useTraining } from "../TrainingProvider";

const BtnRestartFromBeginning = () => {
  const { reset, closeModals } = useTraining();

  return (
    <Button
      onClick={() => {
        reset(true);
        closeModals();
      }}
    >
      Restart from the beginning
    </Button>
  );
};

export default BtnRestartFromBeginning;
