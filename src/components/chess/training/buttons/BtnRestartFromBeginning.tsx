import { Button } from "@/components/ui/button";
import { useTraining } from "../TrainingProvider";

const BtnRestartFromBeginning = () => {
  const { reset, closeModalFixResult } = useTraining();

  return (
    <Button
      onClick={() => {
        reset(true);
        closeModalFixResult();
      }}
    >
      Restart from the beginning
    </Button>
  );
};

export default BtnRestartFromBeginning;
