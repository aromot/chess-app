import { Directory, Move, Position } from "@prisma/client";
import TreeNode from "./TreeNode";

class Tree {
  directory: Directory;
  posInit: Position;
  root: TreeNode;

  constructor(directory: Directory) {
    this.directory = directory;

    // Pour l'instant, la position initiale est celle qui a le même FEN que le FEN initial du directory.
    this.posInit = this.directory.positions.find(
      (pos: Position) => pos.fen === directory.fenPosInit
    );

    // La racine est un noeud qui représente la position de départ (posInit), donc sans coup initial (null).
    this.root = new TreeNode(null, null, this.posInit);

    // Construit l'arbre à partir des données de la BDD.
    const processPosition = (node: TreeNode) => {
      node.position.moves.forEach((move: Move) => {
        const position = this.directory.positions.find(
          (pos: Position) => pos.id === move.nextPositionId
        );
        const newNode = node.add(move, position);
        processPosition(newNode);
      });
    };

    processPosition(this.root);
  }

  // from: https://javascripttoday.com/blog/tree-data-structure-with-javascript/
  traverseBF(fn) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();

      arr.push(...node.children);
      fn(node);
    }
  }

  traverseDF(fn) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();

      arr.unshift(...node.children);
      fn(node);
    }
  }
}

export default Tree;
