import BSTNode from './BSTNode';

/**
 * If b should be to the right of a, then return -1.
 * If b should be to the left of a, return 0 or 1.
 */
export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export const numericCompare: Comparator<number> = (a: number, b: number) => {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else {
    return 1;
  }
};

export default class BinarySearchTree<T> {
  private root: BSTNode<T>;

  constructor(data: T, private compare: Comparator<T>) {
    this.root = new BSTNode<T>(data, null);
  }

  public add(data: T): this {
    this.recursiveAdd(this.root, data);
    return this;
  }

  public search(data: T): BSTNode<T> | null {
    return this.recursiveSearch(this.root, data);
  }

  public get size(): number {
    return this.root.size;
  }

  public get height(): number {
    return this.root.height;
  }

  private recursiveAdd(node: BSTNode<T>, data: T) {
    if (this.compare(node.data, data) === -1) {
      if (node.isLeaf()) {
        node.right = new BSTNode(data);
      } else {
        this.recursiveAdd(node.right, data);
      }
    } else {
      if (node.isLeaf()) {
        node.left = new BSTNode(data);
      } else {
        this.recursiveAdd(node.left, data);
      }
    }
  }

  private recursiveSearch(node: BSTNode<T>, data: T): BSTNode<T> | null {
    if (node.data === data) {
      return node;
    } else if (node.data !== data && node.isLeaf()) {
      return null;
    }

    if (this.compare(node.data, data) === -1) {
      return this.recursiveSearch(node.right, data);
    } else {
      return this.recursiveSearch(node.left, data);
    }
  }
}
