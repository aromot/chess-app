import TreeNode from "@/lib/chess/TreeNode";
import { useChessboard } from "./ChessboardProvider";
import React from "react";
import clsx from "clsx";
import MoveSAN from "./MoveSAN";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import ModalDeleteBranch from "./ModalDeleteBranch";
import { useRouter } from "next/navigation";
import { Move } from "@prisma/client";

const Curve = ({ index }: { index: number }) => {
  const height = index * 37.5;
  const innerHeight = height - 1;

  return (
    <svg width="20" height={height} xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M0,1 C20,1 1,${innerHeight} 20,${innerHeight}`}
        stroke="#1ba1e2"
        strokeWidth={2}
        fill="transparent"
      />
    </svg>
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

const TreeGraph = () => {
  const { node, removeBranch } = useChessboard();
  const parentNodes = node.getParentNodes().slice(-5);
  const router = useRouter();

  // console.log({ node, parentNodes });

  return (
    <>
      <div className="tree-graph border-gray-500 border-2 mb-3 rounded-md relative p-2">
        <div className="flex relative">
          {/* --- Ici les noeuds parents --- */}
          {parentNodes.map((pNode: TreeNode, i: number) => {
            return (
              <React.Fragment key={i}>
                {pNode.move && (
                  <>
                    <div className="moves">
                      <Move node={pNode} disabled />
                    </div>
                    <div className="junctions">
                      <div className="line"></div>
                    </div>
                  </>
                )}
                <Position node={pNode} />
                <div className="junctions">
                  <div className="line"></div>
                </div>
              </React.Fragment>
            );
          })}

          {/* --- Ici le noeud courant --- */}
          {node.move && (
            <>
              <div className="moves">
                <Move node={node} disabled />
              </div>
              <div className="junctions">
                <div className="line"></div>
              </div>
            </>
          )}
          <Position node={node} current />

          {/* --- Ici les noeud enfants --- */}
          {node.hasChildren() && (
            <>
              <div className="junctions">
                {node.children.map((childNode: TreeNode, i: number) => {
                  if (i === 0) {
                    return <div key={i} className="line"></div>;
                  }
                  return (
                    <div key={i} className="curve">
                      <Curve index={i} />
                    </div>
                  );
                })}
              </div>
              <div className="moves">
                {node.children.map((childNode: TreeNode, i: number) => (
                  <Move key={i} node={childNode} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ModalDeleteBranch
        onSuccess={(move: Move) => {
          console.log("REFRESH ROUTE", move);
          router.refresh();
          removeBranch(move);
        }}
      />
    </>
  );
};

export default TreeGraph;
