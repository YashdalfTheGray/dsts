import { cloneDeep } from 'lodash';

export default class TreeNode<T> {
  constructor(
    private nodeData: T,
    public parent: TreeNode<T> | null = null,
    public children: Array<TreeNode<T>> = []
  ) {}

  public get data(): T {
    return cloneDeep(this.nodeData);
  }

  public set data(data: T) {
    this.nodeData = cloneDeep(data);
  }

  public isLeaf(): boolean {
    return this.children.length === 0;
  }
}
