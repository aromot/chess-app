import Link from "next/link";
import Title1 from "../../ui/title1";
import { useChessboard } from "./EditChessboardProvider";
import { URLS } from "@/app/urls";
import CommentHandler from "./CommentHandler";
import EditableTreeGraph from "./EditableTreeGraph";

const PanelInfos = () => {
  const { directory, game } = useChessboard();

  const PGN = game.pgn();
  return (
    <div className="text-white py-5 px-3">
      <div className="mb-5">
        <Title1>Répertoire {`"${directory.name}"`}</Title1>
        <Link href={URLS.dashboard}>
          &laquo; retour à votre tableau de bord
        </Link>
      </div>

      <div className="mt-3">
        <EditableTreeGraph />
        {/* <div className="border-slate-500 rounded-md border-2 p-2">
          <Tree />
        </div> */}
      </div>

      {/* <div>History :</div>
      <div>{game.history().join(" ")}</div> */}

      {PGN && (
        <div className="mt-3">
          <div>PGN :</div>
          <div className="h-5">{PGN}</div>
        </div>
      )}

      <div className="mt-3">
        <CommentHandler />
      </div>

      <div className="mt-3">Position (FEN) : {game.fen()}</div>

      {/* <div className="flex gap-3 mt-5">
        <Button variant="secondary" onClick={onClickReset} disabled={isStart}>
          <ChevronsLeft />
        </Button>
        <Button
          variant="secondary"
          onClick={onClickBackward}
          disabled={isStart}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="secondary"
          onClick={onClickForward}
          disabled={isEndOfBranch}
        >
          <ChevronRight />
        </Button>
      </div> */}

      {/* {isDev() && (
        <div>
          <div>Debug</div>
          <div className="flex gap-3">
            <DebugBox title="position">{position}</DebugBox>
            <DebugBox title="lastMove">{lastMove}</DebugBox>
          </div>
          {/* <div>
            <DebugModal label="node">{node}</DebugModal>
          </div> * /}
        </div>
      )} */}
    </div>
  );
};

export default PanelInfos;
