import TreeNode from './TreeNode';

export class EmptyTreeError extends Error {
  constructor() {
    super('Tree is empty');
  }
}

export default class Tree<T> {
  private root: TreeNode<T> | null;

  constructor(data: T) {
    this.root = new TreeNode<T>(data, null, []);
  }
}
