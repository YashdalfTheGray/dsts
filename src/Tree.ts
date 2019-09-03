import Queue from './Queue';
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
      throw new EmptyTreeError();
    }
  }

  private traverseBFS(nodeCallback: (node: T) => void) {
    const queue = new Queue<TreeNode<T>>();

    if (this.root) {
      queue.enqueue(this.root);

      let currentTree = queue.dequeue();

      while (currentTree) {
        for (let i = 0, length = currentTree.children.length; i < length; i++) {
          queue.enqueue(currentTree.children[i]);
        }

        nodeCallback(currentTree.data);
        currentTree = queue.dequeue();
      }
    }
  }
}
