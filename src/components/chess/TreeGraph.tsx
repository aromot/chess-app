import TreeNode from "@/lib/chess/TreeNode";
import { useChessboard } from "./ChessboardProvider";
import React from "react";

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

function formatSAN(san: string): string {
  return san
    .replace("N", "♞")
    .replace("K", "♚")
    .replace("Q", "♛")
    .replace("R", "♜")
    .replace("B", "♝");
}

const TreeGraph = () => {
  const { node } = useChessboard();
  const parentNodes = node.getParentNodes().slice(-5);

  console.log({ node, parentNodes });

  return (
    <div className="tree-graph border-gray-500 border-2 mb-3 rounded-md relative p-2">
      <div className="flex relative">
        {/* --- Ici les noeuds parents --- */}
        {parentNodes.map((pNode: TreeNode, i: number) => {
          return (
            <React.Fragment key={i}>
              {pNode.move && (
                <>
                  <div className="moves">
                    <div className="move">{formatSAN(pNode.move?.san)}</div>
                  </div>
                  <div className="junctions">
                    <div className="line"></div>
                  </div>
                </>
              )}
              <div className="dot"></div>
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
              <div className="move">{formatSAN(node.move?.san)}</div>
            </div>
            <div className="junctions">
              <div className="line"></div>
            </div>
          </>
        )}
        <div className="dot selected"></div>

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
                <div key={i} className="move">
                  {formatSAN(childNode.move?.san)}
                </div>
              ))}
            </div>
          </>
        )}

        {/* <div className="dot"></div>
        <div className="junctions">
          <div className="line"></div>
          <div className="curve">
            <Curve index={1} />
          </div>
          <div className="curve">
            <Curve index={2} />
          </div>
          <div className="curve">
            <Curve index={3} />
          </div>
          <div className="curve">
            <Curve index={4} />
          </div>
          <div className="curve">
            <Curve index={5} />
          </div>
          <div className="curve">
            <Curve index={6} />
          </div>
          <div className="curve">
            <Curve index={7} />
          </div>
          <div className="curve">
            <Curve index={8} />
          </div>
        </div>
        <div className="moves">
          <div className="move">e4</div>
          <div className="move">d4</div>
          <div className="move">a4</div>
          <div className="move">h4</div>
          <div className="move">Nf3</div>
          <div className="move">c4</div>
          <div className="move">b4</div>
          <div className="move">g4</div>
          <div className="move">g4</div>
        </div>
        <div className="junctions">
          <div className="line"></div>
        </div>
        <div className="dot"></div>
        <div className="junctions">
          <div className="line"></div>
        </div>
        <div className="moves">
          <div className="move">e5</div>
        </div> */}
      </div>
    </div>
  );
};

export default TreeGraph;
