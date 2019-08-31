export default class TreeNode<T> {
  constructor(
    public data: T,
    public parent: TreeNode<T> | null = null,
    public children: Array<TreeNode<T>> = []
  ) {}
}
