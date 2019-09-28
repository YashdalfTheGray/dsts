import BSTNode from './BSTNode';

export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export default class BinarySearchTree<T> {
  private root: BSTNode<T>;

  constructor(data: T, private compare: Comparator<T>) {
    this.root = new BSTNode<T>(data, null);
  }
}
