import { Move, Position } from "@prisma/client";
import { useChessboard } from "./ChessboardProvider";

const TreeNode = ({ move }: { move: Move }) => {
  const { getNextMove, position } = useChessboard();
  const nextMove = getNextMove(move);

  const isCurrent = move.nextPositionId == position.id;

  return (
    <div className="flex gap-3">
      <div
        className={isCurrent ? "font-bold bg-slate-700 rounded-sm px-2" : ""}
      >
        {move.san}
      </div>
      {nextMove && <TreeNode move={nextMove} />}
    </div>
  );
};

const Tree = ({ startPos }: { startPos: Position }) => {
  const initMove = startPos.moves[0] as Move;

  if (!initMove) return;

  return <TreeNode move={initMove} />;
};

export default Tree;
