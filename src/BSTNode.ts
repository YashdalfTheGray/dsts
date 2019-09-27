import { cloneDeep } from 'lodash';

export default class BSTNode<T> {
  public left: BSTNode<T>;
  public right: BSTNode<T>;

  constructor(private nodeData: T, public parent: BSTNode<T> | null = null) {}

  public get data(): T {
    return cloneDeep(this.nodeData);
  }

  public set data(data: T) {
    this.nodeData = cloneDeep(data);
  }

  public isLeaf(): boolean {
    return !this.left && !this.right;
  }

  public get size(): number {
    return ([] as Array<BSTNode<T>>)
      .concat(!!this.left ? [this.left] : [], !!this.right ? [this.right] : [])
      .reduce((size, n) => size + n.size, 1);
  }

  public get height(): number {
    return (
      1 +
      ([] as Array<BSTNode<T>>)
        .concat(
          !!this.left ? [this.left] : [],
          !!this.right ? [this.right] : []
        )
        .reduce((height, n) => {
          const nodeHeight = n.height;
          return nodeHeight > height ? nodeHeight : height;
        }, 0)
    );
  }
}
