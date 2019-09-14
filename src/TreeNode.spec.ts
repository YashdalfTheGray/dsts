import test from 'ava';

import TreeNode from './TreeNode';

test('tree node can take data, parent and children', t => {
  const parent = new TreeNode<number>(1);

  const node = new TreeNode<number>(2, parent);
  t.is(node.data, 2);
  t.is(node.parent!.data, 1);
});

test('tree node has sane defaults for parents and children', t => {
  const node = new TreeNode<number>(2);

  t.is(node.data, 2);
  t.is(node.parent, null);
  t.deepEqual(node.children, []);
});

test('tree node get data returns a copy', t => {
  const node = new TreeNode<number[]>([2, 3]);

  const data = node.data;

  t.deepEqual(data, [2, 3]);
  t.not(node.data, data);
});

test('tree node size returns 1 for just itself', t => {
  const node = new TreeNode<number>(1);

  t.is(node.size, 1);
});

test('tree node size returns the number of nodes with children', t => {
  const node = new TreeNode<number>(1);

  node.children.push(...[1, 2, 3].map(n => new TreeNode<number>(n, node)));

  t.is(node.size, 4);
});

test('tree node size returns the number of nodes with more descendants', t => {
  const node = new TreeNode<number>(1);

  const child1: TreeNode<number> = new TreeNode<number>(2, node);
  const child2: TreeNode<number> = new TreeNode<number>(5, node);
  child1.children.push(...[3, 4].map(n => new TreeNode<number>(n, child1)));
  child2.children.push(
    ...[6, 7, 8, 9].map(n => new TreeNode<number>(n, child2))
  );
  node.children.push(child1, child2);

  t.is(node.size, 9);
});

test('tree node height returns 1 for just itself', t => {
  const node = new TreeNode<number>(1);

  t.is(node.height, 1);
});

test('tree node height returns 2 for a node with children', t => {
  const node = new TreeNode<number>(1);

  node.children.push(...[1, 2, 3].map(n => new TreeNode<number>(n, node)));

  t.is(node.height, 2);
});

test('tree node height returns the number of levels of a tree', t => {
  const node = new TreeNode<number>(1);

  const child1: TreeNode<number> = new TreeNode<number>(2, node);
  const child2: TreeNode<number> = new TreeNode<number>(5, node);
  child1.children.push(...[3, 4].map(n => new TreeNode<number>(n, child1)));
  child2.children.push(
    ...[6, 7, 8, 9].map(n => new TreeNode<number>(n, child2))
  );
  node.children.push(child1, child2);

  t.is(node.height, 3);
});

test('tree node isLeaf returns true for a single tree node', t => {
  const node = new TreeNode<number>(1);

  t.is(node.isLeaf(), true);
});

test('tree node isLeaf returns false for a node with children', t => {
  const node = new TreeNode<number>(1);

  node.children.push(new TreeNode<number>(2));

  t.is(node.isLeaf(), false);
});

test('can set the tree node data using the data property', t => {
  const node = new TreeNode<number[]>([1, 2]);

  const newData = [2, 3];
  node.data = newData;

  t.deepEqual(node.data, [2, 3]);
  t.not(node.data, newData);
});
