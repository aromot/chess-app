import { Move, Position } from "@prisma/client";

class TreeNode {
  parentNode: TreeNode | null;
  move: Move | null;
  position: Position;
  children: TreeNode[];
  trainingResult: boolean | undefined;
  trainingWrongMoves: string[]; // liste de SAN
  depth: number;

  // pour le TreeNode root de l'arbre:
  // - le parentNode est null,
  // - le move est null (position initiale, donc pas encore de Move)
  // la position d'un noeud est la position résultante APRES le move.
  constructor(
    parentNode: TreeNode | null,
    move: Move | null,
    position: Position
  ) {
    this.parentNode = parentNode;
    this.move = move;
    this.position = position;
    this.trainingWrongMoves = [];
    this.children = [];
    this.depth = parentNode ? parentNode.depth + 1 : 0;
  }

  addWrongMove(move: string) {
    this.trainingWrongMoves.push(move);
  }

  removeWrongMove(move: string) {
    this.trainingWrongMoves = this.trainingWrongMoves.filter(
      (san) => san === move
    );
  }

  hasWrongMoves() {
    return this.trainingWrongMoves.length > 0;
  }

  isRoot(): boolean {
    return !this.parentNode;
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

  getChildrenSANs() {
    this.children.map((childNode: TreeNode) => childNode.move?.san);
  }

  isVariation() {
    if (!this.parentNode) {
      return false;
    }

    return this.parentNode.children.length > 1;
  }

  isTrainedRight() {
    return this.trainingResult === true;
  }

  isTrainedWrong() {
    return this.trainingResult === false;
  }

  isTrained() {
    return this.trainingResult !== undefined;
  }
}

export default TreeNode;
