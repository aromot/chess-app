import { Button } from "../ui/button";
import { useChessboard } from "./ChessboardProvider";
import Node from "@/lib/chess/TreeNode";

const TreeNode = ({ node }: { node: Node }) => {
  const { lastMove, onClickGoToNode } = useChessboard();

  if (!node.hasChildren()) return;

  return (
    <div className="border-teal-100 border-0">
      {node.children.map((childNode: Node, i) => {
        const isCurrent = lastMove?.id === childNode.move?.id;

        return (
          <div key={i} className="flex gap-3">
            <div className="border-red-600 border-0 ">
              <Button
                variant="ghost"
                size="sm"
                className={
                  isCurrent ? "px-2 rounded-sm bg-slate-700 font-bold" : "px-2"
                }
                onClick={() => onClickGoToNode("abc")}
              >
                {i === 0 ? "-" : "+"}
                {childNode.move?.san}
              </Button>
            </div>
            <TreeNode node={childNode} />
          </div>
        );
      })}
    </div>
  );
};

const Tree = () => {
  const { tree } = useChessboard();
  return <TreeNode node={tree.root} />;
};

export default Tree;
