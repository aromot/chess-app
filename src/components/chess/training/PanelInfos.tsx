import { useTraining } from "./TrainingProvider";
import Scores from "./Scores";
import { Ban, TriangleAlert } from "lucide-react";

const PanelInfos = () => {
  const {
    directory,
    game,
    isWaitingForUserMove,
    isTrainerAnswers,
    trainerAnswer,
    isEndOfBranch,
    stats,
  } = useTraining();

  const PGN = game.pgn();

  const total = stats.nbOk + stats.nbKo;

  return (
    <div className="text-white py-5 px-3 max-w-[34rem]">
      <div className="mb-5">
        {isWaitingForUserMove && (
          <>A votre tour: dans cette position, quel coup jouez-vous ?</>
        )}
        {isTrainerAnswers && trainerAnswer && (
          <div className="text-2xl text-green-600">BRAVO !</div>
        )}
        {isTrainerAnswers && !trainerAnswer && (
          <div className="text-2xl text-red-700 flex gap-3 items-center bg-red-100 p-5 rounded-lg">
            <TriangleAlert size={32} className="" />
            <div
              className="text-3xl"
              // style={{ textShadow: "0px 0px 5px #000000" }}
            >
              Non, ce n'est pas ça !
            </div>
          </div>
        )}
        {isEndOfBranch && <div>Fin de la branche</div>}
      </div>

      <Scores />

      {/* {!isStart  && (
        <div className="mt-3">
          <TrainingTreeGraph />
        </div>
      )} */}

      {PGN && (
        <div className="mt-3">
          <div>PGN :</div>
          <div className="h-5">{PGN}</div>
        </div>
      )}
    </div>
  );
};

export default PanelInfos;
