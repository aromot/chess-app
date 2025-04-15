import { useTraining } from "./TrainingProvider";
import Scores from "./Scores";
import { SquarePlay, TriangleAlert } from "lucide-react";
import ModalResults from "./ModalResults";
import ModalFixResult from "./ModalFixResult";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const msgContVariants = cva(
  "flex gap-1 lg:gap-3 items-center py-1 px-2 md:p-5 rounded-lg",
  {
    variants: {
      variant: {
        user_turn: "bg-white text-sky-950",
        right: "bg-green-100 text-green-700",
        wrong: "bg-red-100 text-red-700",
      },
    },
    defaultVariants: {
      variant: "user_turn",
    },
  }
);

interface MsgContProps extends VariantProps<typeof msgContVariants> {
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const MessageContainer = ({ variant, icon: Icon, children }: MsgContProps) => {
  return (
    <div className={cn(msgContVariants({ variant }))}>
      {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />}
      <div className="md:text-2xl lg:text-3xl">{children}</div>
    </div>
  );
};

const PanelInfos = () => {
  const {
    game,
    isWaitingForUserMove,
    isTrainerAnswers,
    trainerAnswer,
    fixMode,
    modalResultIsOpen,
    modalFixResultIsOpen,
  } = useTraining();

  const PGN = game.pgn();

  return (
    <div className="text-white sm:py-3 px-3">
      {fixMode && (
        <div className="mb-3 ">
          <span className="bg-emerald-700 rounded-md px-2 inline-block font-bold">
            Fix mode is ON
          </span>
        </div>
      )}
      <div className="mb-5">
        {isWaitingForUserMove && (
          <MessageContainer variant="user_turn" icon={SquarePlay}>
            It's your turn...
          </MessageContainer>
        )}
        {isTrainerAnswers && trainerAnswer && (
          <MessageContainer variant="right">🎉 Good!</MessageContainer>
        )}
        {isTrainerAnswers && !trainerAnswer && (
          <MessageContainer variant="wrong" icon={TriangleAlert}>
            No, try again
          </MessageContainer>
        )}
      </div>

      {!fixMode && <Scores />}

      {PGN && (
        <div className="mt-5 rounded-lg bg-zinc-800 p-3  overflow-auto">
          <div>PGN :</div>
          <div className="min-h-5">{PGN}</div>
        </div>
      )}

      {/* {isDev() && (
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
      )} */}

      {modalResultIsOpen && <ModalResults />}
      {modalFixResultIsOpen && <ModalFixResult />}
    </div>
  );
};

export default PanelInfos;
