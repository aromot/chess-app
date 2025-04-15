import { useChessboard } from "./EditChessboardProvider";
import CommentHandler from "./CommentHandler";
import EditableTreeGraph from "./EditableTreeGraph";

const PanelInfos = () => {
  const { game } = useChessboard();

  const PGN = game.pgn();
  return (
    <div className="text-white px-3">
      <div className="mt-3">
        <EditableTreeGraph />
        {/* <div className="border-slate-500 rounded-md border-2 p-2">
          <Tree />
        </div> */}
      </div>

      {PGN && (
        <div className="mt-3">
          <div>PGN :</div>
          <div className="h-5">{PGN}</div>
        </div>
      )}

      <div className="mt-3">
        <CommentHandler />
      </div>

      <div className="mt-3 sm:text-sm overflow-scroll md:overflow-auto">
        Position (FEN) : {game.fen()}
      </div>
    </div>
  );
};

export default PanelInfos;
