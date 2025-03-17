import { Move, Position } from "@prisma/client";

class TreeNode {
  parentNode: TreeNode | null;
  move: Move | null;
  position: Position;
  children: TreeNode[];

  // move peut-être null pour le TreeNode root de l'arbre (position initiale, donc pas encore de Move)
  // la position est la position résultante APRES le move.
  constructor(
    parentNode: TreeNode | null,
    move: Move | null,
    position: Position
  ) {
    this.parentNode = parentNode;
    this.move = move;
    this.position = position;
    this.children = [];
  }

  add(move: Move, position: Position) {
    const node = new TreeNode(this, move, position);
    this.children.push(node);
    return node;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  hasMove(san: string): boolean {
    return !!this.getChildBySan(san);
  }

  getChildBySan(san: string): TreeNode | undefined {
    return this.children.find((node: TreeNode) => node.move?.san === san);
  }

  getNextNode(): TreeNode | undefined {
    return this.children[0];
  }

  getParentNodes(): TreeNode[] {
    let _node = this as TreeNode;
    const parentNodes = [];
    let i = 0;
    while (_node.parentNode && i++ < 999999) {
      parentNodes.unshift(_node.parentNode);
      _node = _node.parentNode;
    }

    return parentNodes;
  }

  removeBranch(move: Move) {
    this.children = this.children.filter(
      (childNode: TreeNode) => childNode.move?.san !== move.san
    );
  }
}

export default TreeNode;
