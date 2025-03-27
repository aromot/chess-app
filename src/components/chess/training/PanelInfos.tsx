import { useTraining } from "./TrainingProvider";
import Scores from "./Scores";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const PanelInfos = () => {
  const {
    game,
    isWaitingForUserMove,
    isTrainerAnswers,
    trainerAnswer,
    isEndOfBranch,
    reset,
  } = useTraining();

  const PGN = game.pgn();

  return (
    <div className="text-white py-5 px-3 max-w-[34rem]">
      <div className="mb-5">
        {isWaitingForUserMove && (
          <div className="text-2xl text-sky-950 flex gap-3 items-center bg-white p-5 rounded-lg">
            <div
              className="text-3xl"
              // style={{ textShadow: "0px 0px 5px #000000" }}
            >
              It's your turn
            </div>
          </div>
        )}
        {isTrainerAnswers && trainerAnswer && (
          <div className="text-2xl text-green-700 flex gap-3 items-center bg-green-100 p-5 rounded-lg">
            <div
              className="text-3xl"
              // style={{ textShadow: "0px 0px 5px #000000" }}
            >
              🎉 Good!
            </div>
          </div>
        )}
        {isTrainerAnswers && !trainerAnswer && (
          <div className="text-2xl text-red-700 flex gap-3 items-center bg-red-100 p-5 rounded-lg">
            <TriangleAlert size={32} className="" />
            <div
              className="text-3xl"
              // style={{ textShadow: "0px 0px 5px #000000" }}
            >
              No, try again
            </div>
          </div>
        )}
        {isEndOfBranch && (
          <div>
            Fin de la branche{" "}
            <Button
              onClick={() => {
                reset();
              }}
            >
              RESTART
            </Button>
          </div>
        )}
      </div>

      <Scores />

      {/* {!isStart  && (
        <div className="mt-3">
          <TrainingTreeGraph />
        </div>
      )} */}

      {PGN && (
        <div className="mt-5 rounded-lg bg-zinc-800 p-3">
          <div>PGN :</div>
          <div className="h-5">{PGN}</div>
        </div>
      )}
    </div>
  );
};

export default PanelInfos;
