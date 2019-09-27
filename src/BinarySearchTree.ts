import BSTNode from './BSTNode';

export default class BinarySearchTree<T> {
  private root: BSTNode<T>;

  constructor(data: T) {
    this.root = new BSTNode<T>(data, null);
  }
}
