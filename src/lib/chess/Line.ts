import TreeNode from "./TreeNode";

class Line {
  nodes: TreeNode[];
  trained: boolean;

  constructor(nodes: TreeNode[]) {
    this.nodes = nodes;
    this.trained = false;
  }
}

export default Line;
