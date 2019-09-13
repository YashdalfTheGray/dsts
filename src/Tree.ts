import Queue, { EmptyQueueError } from './Queue';
import TreeNode from './TreeNode';

export class EmptyTreeError extends Error {
  constructor() {
    super('Tree is empty');
  }
}

export class ParentNodeNotFoundError<T> extends Error {
  constructor(parent: T) {
    super(`A node with data, ${parent} not found`);
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

  constructor(
    data?: T,
    private defaultStrategy: TraversalStrategies = TraversalStrategies.DEPTH_FIRST
  ) {
    if (data) {
      this.root = new TreeNode<T>(data);
    } else {
      this.root = null;
    }
  }

  public search(
    testFunc: Predicate<T, boolean>,
    strategy: TraversalStrategies = this.defaultStrategy
  ): TreeNode<T> | null {
    let returnVal: TreeNode<T> | null = null;

    const nodeSearchFunc = (node: TreeNode<T>) => {
      if (!returnVal) {
        returnVal = testFunc(node) ? node : null;
      }
    };

    if (strategy === Tree.TraversalStrageies.BREADTH_FIRST) {
      this.traverseBFS(nodeSearchFunc);
    } else {
      this.traverseDFS(nodeSearchFunc);
    }

    return returnVal;
  }

  public add(
    data: T,
    parent: T,
    strategy: TraversalStrategies = this.defaultStrategy
  ) {
    const parentNode = this.search(node => node.data === parent, strategy);
    this.addNodeChild(data, parentNode);
  }

  public addNodeChild(data: T, node: TreeNode<T> | null = this.root) {
    if (node) {
      node.children.push(new TreeNode<T>(data, node));
    } else {
      throw new ParentNodeNotFoundError(parent);
    }
  }

  public contains(
    data: T,
    strategy: TraversalStrategies = Tree.TraversalStrageies.DEPTH_FIRST
  ): boolean {
    return !!this.search(node => node.data === data, strategy);
  }

  public get size(): number {
    return this.root ? this.root.size : 0;
  }

  public get height(): number {
    return this.root ? this.root.height : 0;
  }

  private traverseDFS(nodeCallback: Predicate<T, void>) {
    if (this.root) {
      (function dfs(currentNode) {
        currentNode.children.forEach(c => {
          dfs(c);
        });
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
        currentTree.children.forEach(c => {
          queue.enqueue(c);
        });

        nodeCallback(currentTree);
        try {
          currentTree = queue.dequeue();
        } catch (e) {
          if (e instanceof EmptyQueueError) {
            currentTree = (null as unknown) as TreeNode<T>;
          } else {
            throw e;
          }
        }
      }
    } else {
      throw new EmptyTreeError();
    }
  }
}
