import { useTraining } from "./TrainingProvider";
import Scores from "./Scores";
import { SquarePlay, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import ModalResults from "./ModalResults";
import Tree from "../common/Tree";

const PanelInfos = () => {
  const {
    game,
    isWaitingForUserMove,
    isTrainerAnswers,
    trainerAnswer,
    isEndOfBranch,
    openModalResult,
  } = useTraining();

  useEffect(() => {
    if (isEndOfBranch) {
      openModalResult();
    }
  }, [isEndOfBranch, openModalResult]);

  const PGN = game.pgn();

  return (
    <div className="text-white py-5 px-3 max-w-[34rem]">
      <div className="mb-5">
        {isWaitingForUserMove && (
          <div className="text-2xl text-sky-950 flex gap-3 items-center bg-white p-5 rounded-lg">
            <SquarePlay size={32} />
            <div className="text-3xl">It's your turn...</div>
          </div>
        )}
        {isTrainerAnswers && trainerAnswer && (
          <div className="text-2xl text-green-700 flex gap-3 items-center bg-green-100 p-5 rounded-lg">
            <div className="text-3xl">🎉 Good!</div>
          </div>
        )}
        {isTrainerAnswers && !trainerAnswer && (
          <div className="text-2xl text-red-700 flex gap-3 items-center bg-red-100 p-5 rounded-lg">
            <TriangleAlert size={32} />
            <div className="text-3xl">No, try again</div>
          </div>
        )}
      </div>

      <Scores />

      {PGN && (
        <div className="mt-5 rounded-lg bg-zinc-800 p-3">
          <div>PGN :</div>
          <div className="h-5">{PGN}</div>
        </div>
      )}

      <ModalResults />
    </div>
  );
};

export default PanelInfos;
