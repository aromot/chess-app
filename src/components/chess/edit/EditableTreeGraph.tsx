import clsx from "clsx";
import TreeGraph from "../common/TreeGraph";
import { useChessboard } from "./EditChessboardProvider";
import TreeNode from "@/lib/chess/TreeNode";
import MoveSAN from "../common/MoveSAN";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const Position = ({ node, current }: { node: TreeNode; current?: boolean }) => {
  const { onClickGoToNode } = useChessboard();
  return (
    <button
      onClick={() => onClickGoToNode(node)}
      className={clsx("dot", current && "selected")}
      disabled={current}
    />
  );
};

const Move = ({ node, disabled }: { node: TreeNode; disabled?: boolean }) => {
  const { onClickGoToNode, openModalDeleteBranch } = useChessboard();
  return (
    <div className="flex group">
      <button
        onClick={() => onClickGoToNode(node)}
        className="move"
        disabled={disabled}
      >
        <MoveSAN san={node.move?.san || ""} />
        {/* {formatSAN(node.move?.san || "")} */}
      </button>
      {!disabled && (
        <Button
          size="sm"
          variant="ghost"
          className="invisible group-hover:visible"
          onClick={() => {
            if (!node.move) {
              alert("No move to delete!");
              throw new Error("No move to delete.");
            }
            openModalDeleteBranch(node.move);
          }}
        >
          <Trash2 />
        </Button>
      )}
    </div>
  );
};

const EditableTreeGraph = () => {
  const { node, removeBranch } = useChessboard();

  return (
    <TreeGraph
      node={node}
      removeBranch={removeBranch}
      Position={Position}
      Move={Move}
    />
  );
};

export default EditableTreeGraph;
