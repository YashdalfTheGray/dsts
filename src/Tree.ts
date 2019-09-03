import TreeNode from './TreeNode';

export class EmptyTreeError extends Error {
  constructor() {
    super('Tree is empty');
  }
}

export default class Tree<T> {
  private root: TreeNode<T> | null;

  constructor(data: T) {
    this.root = new TreeNode<T>(data, null, []);
  }

  private traverseDFS(nodeCallback: (node: T) => void) {
    if (this.root) {
      (function dfs(currentNode) {
        for (let i = 0, length = currentNode.children.length; i < length; i++) {
          dfs(currentNode.children[i]);
        }
        nodeCallback(currentNode.data);
      })(this.root);
    } else {
      throw new Error('Tree is empty');
    }
  }
}
