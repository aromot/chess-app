import TreeNode from "@/lib/chess/TreeNode";
import React from "react";
import ModalDeleteBranch from "../edit/ModalDeleteBranch";
import { useRouter } from "next/navigation";
import { Move as ModelMove } from "@prisma/client";

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

type Props = {
  node: TreeNode;
  removeBranch?: (move: ModelMove) => void;
  Position: React.ComponentType<{
    node: TreeNode;
    current?: boolean;
  }>;
  Move: React.ComponentType<{
    node: TreeNode;
    disabled?: boolean;
  }>;
  showChildren?: boolean;
};

const TreeGraph = ({
  node,
  removeBranch,
  Position,
  Move,
  showChildren = true,
}: Props) => {
  const parentNodes = node.getParentNodes().slice(-6);
  const router = useRouter();

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
          {showChildren && node.hasChildren() && (
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
      {removeBranch && (
        <ModalDeleteBranch
          onSuccess={(move: ModelMove) => {
            router.refresh();
            removeBranch(move);
          }}
        />
      )}
    </>
  );
};

export default TreeGraph;
