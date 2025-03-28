import { Directory, Move, Position } from "@prisma/client";
import TreeNode from "./TreeNode";

class Tree {
  directory: Directory;
  posInit: Position;
  root: TreeNode;

  constructor(directory: Directory, positionId?: number | null) {
    this.directory = directory;

    // Pour la position initiale, 2 possibilités:
    // 1. si le positionId est défini: la position initiale est celle de l'id fourni.
    // 2. sinon: la position initiale est celle qui a le même FEN que le FEN initial du directory.
    this.posInit = positionId
      ? this.directory.positions.find((pos: Position) => pos.id === positionId)
      : this.directory.positions.find(
          (pos: Position) => pos.fen === directory.fenPosInit
        );

    // La racine est un noeud qui représente la position de départ (posInit), donc sans coup initial (null) ni noeud parent (null).
    this.root = new TreeNode(null, null, this.posInit);

    // Construit l'arbre à partir des données de la BDD.
    const processNode = (node: TreeNode) => {
      node.position.moves.forEach((move: Move) => {
        const position = this.directory.positions.find(
          (pos: Position) => pos.id === move.nextPositionId
        );
        const newNode = node.add(move, position);
        processNode(newNode);
      });
    };

    processNode(this.root);
  }

  // from: https://javascripttoday.com/blog/tree-data-structure-with-javascript/
  traverseBF(fn: (node: TreeNode) => void) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();

      if (!node) {
        throw new Error("Node not found while traversing BF");
      }

      arr.push(...node.children);
      fn(node);
    }
  }

  // traverseDF(fn) {
  //   const arr = [this.root];
  //   while (arr.length) {
  //     const node = arr.shift();

  //     arr.unshift(...node.children);
  //     fn(node);
  //   }
  // }
}

export default Tree;
