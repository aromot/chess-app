import Title1 from "@/components/ui/title1";
import { useTraining } from "./TrainingProvider";
import Link from "next/link";
import { URLS } from "@/app/urls";
// import TrainingTreeGraph from "./TrainingTreeGraph";
import Scores from "./Scores";

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
    <div className="text-white py-5 px-3">
      <div className="mb-5">
        <Title1>Répertoire {`"${directory.name}"`}</Title1>
        <Link href={URLS.dashboard}>
          &laquo; retour à votre tableau de bord
        </Link>
      </div>

      <div>
        {isWaitingForUserMove && (
          <>A votre tour: dans cette position, quel coup jouez-vous ?</>
        )}
        {isTrainerAnswers && trainerAnswer && (
          <div className="text-2xl text-green-600">BRAVO !</div>
        )}
        {isTrainerAnswers && !trainerAnswer && (
          <div className="text-2xl text-red-700">Non, ce n'est pas ça !</div>
        )}
        {isEndOfBranch && <div>Fin de la branche</div>}
      </div>

      {total > 0 && (
        <div>
          <Scores />
        </div>
      )}

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
