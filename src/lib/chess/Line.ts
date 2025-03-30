import { Chess } from "chess.js";
import TreeNode from "./TreeNode";
import { arraysAreEqual } from "../helpers";

class Line {
  // Les nodes ne contionnent jamais le noeud root de l'arbre.
  nodes: TreeNode[];
  trained: boolean;

  constructor(nodes: TreeNode[]) {
    this.nodes = nodes;
    this.trained = false;
  }

  // Est-ce que une ligne "e4, e5, Nf3, Nc6, Bc4" match une game "e4, e5, Nf3" par exemple ?
  matchesGame(game: Chess, depth: number) {
    const gameHistory = game.history();
    const lineHistory = this.nodes
      .slice(0, depth + 1)
      .map((node) => node.move?.san);

    return arraysAreEqual(gameHistory, lineHistory);
  }
}

export default Line;
