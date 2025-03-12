import { Move, Position } from "@prisma/client";
import { useChessboard } from "./ChessboardProvider";
import { useDirectory } from "@/app/directories/_components/DirectoryProvider";

const myTree = {
  position: {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    moves: [
      {
        san: "e4",
        position: {
          fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
          moves: [
            {
              san: "e5",
              position: {
                fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
                moves: [
                  {
                    san: "Nf3",
                    position: {
                      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
                      moves: [],
                    },
                  },
                  {
                    san: "d4",
                    position: {
                      fen: "rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2",
                      moves: [],
                    },
                  },
                ],
              },
            },
            {
              san: "d5",
              position: {
                fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
                moves: [],
              },
            },
          ],
        },
      },
    ],
  },
};

const TreeNode = ({ position }: { position: Position }) => {
  // const { getNextMove, position } = useChessboard();
  // const nextMove = getNextMove(move);

  // const isCurrent = move.nextPositionId == position.id;

  // return (
  //   <div className="flex gap-3">
  //     <div
  //       className={isCurrent ? "font-bold bg-slate-700 rounded-sm px-2" : ""}
  //     >
  //       {move.san}
  //     </div>
  //     {nextMove && <TreeNode move={nextMove} />}
  //   </div>
  // );
  if (!position.moves || position.moves.length === 0) return;

  return (
    <div className="border-teal-100 border-0">
      {position.moves.map((move, i) => {
        return (
          <div key={i} className="flex gap-3">
            <div className="border-red-600 border-0">
              {i === 0 ? "-" : "+"}
              {move.san}
            </div>
            <TreeNode position={move.position} />
          </div>
        );
      })}
    </div>
  );
};

const Tree = ({ startPos }: { startPos?: Position }) => {
  const { tree } = useChessboard();
  return <TreeNode position={tree.position} />;
};

export default Tree;
