import { useTraining } from "./TrainingProvider";
import Scores from "./Scores";
import { SquarePlay, TriangleAlert } from "lucide-react";
import ModalResults from "./ModalResults";
import clsx from "clsx";
import ModalFixResult from "./ModalFixResult";
import { isDev } from "@/lib/helpers";

const PanelInfos = () => {
  const {
    game,
    isWaitingForUserMove,
    isTrainerAnswers,
    trainerAnswer,
    filteredLines,
    depth,
    fixMode,
    modalResultIsOpen,
    modalFixResultIsOpen,
  } = useTraining();

  const PGN = game.pgn();

  return (
    <div className="text-white py-5 px-3 max-w-[34rem]">
      {fixMode && (
        <div className="mb-3 ">
          <span className="bg-emerald-700 rounded-md px-2 inline-block font-bold">
            Fix mode is ON
          </span>
        </div>
      )}
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

      {!fixMode && <Scores />}

      {PGN && (
        <div className="mt-5 rounded-lg bg-zinc-800 p-3">
          <div>PGN :</div>
          <div className="min-h-5">{PGN}</div>
        </div>
      )}

      {isDev() && (
        <div className="mt-3 border-2 p-3">
          {filteredLines.length === 0 && <>No more variation to train.</>}
          {filteredLines.map((line, i) => {
            return (
              <div key={i} className="flex gap-3 mb-1">
                <span>{i + 1}.</span>
                {line.nodes.map((node, i) =>
                  depth === i ? (
                    <span
                      className={clsx(
                        "border-b-4 border-yellow-400",
                        node.hasWrongMoves() && "bg-red-900"
                      )}
                      key={i}
                    >
                      {node.move.san}
                    </span>
                  ) : (
                    <span key={i}>{node.move.san}</span>
                  )
                )}
                {line.trained && <span className="bg-purple-800">[T]</span>}
              </div>
            );
          })}
        </div>
      )}

      {modalResultIsOpen && <ModalResults />}
      {modalFixResultIsOpen && <ModalFixResult />}
    </div>
  );
};

export default PanelInfos;
