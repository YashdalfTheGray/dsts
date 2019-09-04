import Queue from './Queue';
import TreeNode from './TreeNode';

export class EmptyTreeError extends Error {
  constructor() {
    super('Tree is empty');
  }
}

enum TraversalStrategies {
  BFS,
  DFS
}

type Predicate<T, R> = (node: T) => R;

export default class Tree<T> {
  public static readonly TraversalStrageies = TraversalStrategies;

  private root: TreeNode<T> | null;

  constructor(data?: T) {
    if (data) {
      this.root = new TreeNode<T>(data, null, []);
    } else {
      this.root = null;
    }
  }

  private traverseDFS<R>(nodeCallback: Predicate<T, R>) {
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

  private traverseBFS<R>(nodeCallback: Predicate<T, R>) {
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
    } else {
      throw new EmptyTreeError();
    }
  }
}
