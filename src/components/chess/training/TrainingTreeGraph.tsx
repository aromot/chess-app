import TreeNode from "@/lib/chess/TreeNode";
import TreeGraph from "../common/TreeGraph";
import { useTraining } from "./TrainingProvider";
import clsx from "clsx";
import MoveSAN from "../common/MoveSAN";

const Position = ({ node, current }: { node: TreeNode; current?: boolean }) => {
  // const { onClickGoToNode } = useChessboard();
  return (
    <button
      // onClick={() => onClickGoToNode(node)}
      className={clsx("dot", current && "selected")}
      disabled={current}
    />
  );
};

const Move = ({ node, disabled }: { node: TreeNode; disabled?: boolean }) => {
  // const { onClickGoToNode, openModalDeleteBranch } = useChessboard();
  return (
    <div className="flex group">
      <button
        // onClick={() => onClickGoToNode(node)}
        className="move"
        disabled={disabled}
      >
        <MoveSAN san={node.move?.san || ""} />
        {/* {formatSAN(node.move?.san || "")} */}
      </button>
      {/* {!disabled && (
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
      )} */}
    </div>
  );
};

const TrainingTreeGraph = () => {
  const { node } = useTraining();

  return (
    <TreeGraph
      node={node}
      Move={Move}
      Position={Position}
      showChildren={false}
    />
  );
};

export default TrainingTreeGraph;
