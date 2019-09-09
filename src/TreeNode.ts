import { cloneDeep } from 'lodash';

export default class TreeNode<T> {
  public children: Array<TreeNode<T>>;

  constructor(private nodeData: T, public parent: TreeNode<T> | null = null) {
    this.children = [];
  }

  public get data(): T {
    return cloneDeep(this.nodeData);
  }

  public set data(data: T) {
    this.nodeData = cloneDeep(data);
  }

  public isLeaf(): boolean {
    return this.children.length === 0;
  }

  public get size(): number {
    return this.children.reduce((size, n) => size + n.size, 1);
  }

  public get height(): number {
    return (
      1 +
      this.children.reduce((height, n) => {
        const nodeHeight = n.height;
        return nodeHeight > height ? nodeHeight : height;
      }, 0)
    );
  }
}
