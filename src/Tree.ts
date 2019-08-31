import TreeNode from './TreeNode';

export default class Tree<T> {
  private root: TreeNode<T> | null;

  constructor(data: T) {
    this.root = new TreeNode<T>(data, null, []);
  }
}
