import TreeNode from "@/lib/chess/TreeNode";
import TreeGraph from "../common/TreeGraph";
import { useTraining } from "./TrainingProvider";
import clsx from "clsx";
import MoveSAN from "../common/MoveSAN";

const Position = ({ node, current }: { node: TreeNode; current?: boolean }) => {
  return (
    <button className={clsx("dot", current && "selected")} disabled={current} />
  );
};

const Move = ({ node, disabled }: { node: TreeNode; disabled?: boolean }) => {
  return (
    <div className="flex group">
      <button className="move" disabled={disabled}>
        <MoveSAN san={node.move?.san || ""} />
      </button>
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
