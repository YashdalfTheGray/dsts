import Queue from './Queue';
import TreeNode from './TreeNode';

export class EmptyTreeError extends Error {
  constructor() {
    super('Tree is empty');
  }
}

enum TraversalStrategies {
  BREADTH_FIRST,
  DEPTH_FIRST
}

type Predicate<T, R> = (node: TreeNode<T>) => R;

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

  public search(
    testFunc: Predicate<T, boolean>,
    strategy: TraversalStrategies = Tree.TraversalStrageies.DEPTH_FIRST
  ): TreeNode<T> | null {
    let returnVal: TreeNode<T> | null = null;
    if (strategy === Tree.TraversalStrageies.BREADTH_FIRST) {
      this.traverseDFS(node =>
        testFunc(node) ? (returnVal = node) : (returnVal = null)
      );
    } else {
      this.traverseBFS(node =>
        testFunc(node) ? (returnVal = node) : (returnVal = null)
      );
    }

    return returnVal;
  }

  private traverseDFS(nodeCallback: Predicate<T, void>) {
    if (this.root) {
      (function dfs(currentNode) {
        for (let i = 0, length = currentNode.children.length; i < length; i++) {
          dfs(currentNode.children[i]);
        }
        nodeCallback(currentNode);
      })(this.root);
    } else {
      throw new EmptyTreeError();
    }
  }

  private traverseBFS(nodeCallback: Predicate<T, void>) {
    const queue = new Queue<TreeNode<T>>();

    if (this.root) {
      queue.enqueue(this.root);

      let currentTree = queue.dequeue();

      while (currentTree) {
        for (let i = 0, length = currentTree.children.length; i < length; i++) {
          queue.enqueue(currentTree.children[i]);
        }

        nodeCallback(currentTree);
        currentTree = queue.dequeue();
      }
    } else {
      throw new EmptyTreeError();
    }
  }
}
