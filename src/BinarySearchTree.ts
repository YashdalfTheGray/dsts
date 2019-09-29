import BSTNode from './BSTNode';

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
}
