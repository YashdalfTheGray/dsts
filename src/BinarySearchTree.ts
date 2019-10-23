import { isEqual } from 'lodash';

import BSTNode from './BSTNode';
import { DuplicateNodeError, NodeNotFoundError } from './errors';
import { Comparator } from './utils';

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

  public contains(data: T): boolean {
    return this.recursiveSearch(this.root, data) !== null;
  }

  public get size(): number {
    return this.root.size;
  }

  public get height(): number {
    return this.root.height;
  }

  private recursiveAdd(node: BSTNode<T>, data: T) {
    if (this.compare(node.data, data) === 0) {
      throw new DuplicateNodeError(data);
    } else if (this.compare(node.data, data) === -1) {
      if (!node.left) {
        node.left = new BSTNode(data, node);
      } else {
        this.recursiveAdd(node.left, data);
      }
    } else {
      if (!node.right) {
        node.right = new BSTNode(data, node);
      } else {
        this.recursiveAdd(node.right, data);
      }
    }
  }

  private recursiveSearch(node: BSTNode<T>, data: T): BSTNode<T> | null {
    if (isEqual(node.data, data)) {
      return node;
    } else if (node.data !== data && node.isLeaf()) {
      return null;
    }

    if (this.compare(node.data, data) === -1) {
      return node.left ? this.recursiveSearch(node.left, data) : null;
    } else {
      return node.right ? this.recursiveSearch(node.right, data) : null;
    }
  }
}
