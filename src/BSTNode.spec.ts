import test from 'ava';

import BSTNode from './BSTNode';

test('tree node can take data, parent and children', t => {
  const parent = new BSTNode<number>(1);

  const node = new BSTNode<number>(2, parent);
  t.is(node.data, 2);
  t.is(node.parent!.data, 1);
});

test('tree node has sane defaults for parents and children', t => {
  const node = new BSTNode<number>(2);

  t.is(node.data, 2);
  t.is(node.parent, null);
  t.deepEqual(node.left, undefined);
  t.deepEqual(node.right, undefined);
});

test('tree node get data returns a copy', t => {
  const node = new BSTNode<number[]>([2, 3]);

  const data = node.data;

  t.deepEqual(data, [2, 3]);
  t.not(node.data, data);
});

test('tree node size returns 1 for just itself', t => {
  const node = new BSTNode<number>(1);

  t.is(node.size, 1);
});

test('tree node size returns the number of nodes with children', t => {
  const node = new BSTNode<number>(1);

  node.left = new BSTNode<number>(0, node);
  node.right = new BSTNode<number>(2, node);

  t.is(node.size, 3);
});

test('tree node size returns the number of nodes with more descendants', t => {
  const node = new BSTNode<number>(2);

  node.left = new BSTNode<number>(1, node);
  node.right = new BSTNode<number>(5, node);
  node.left.left = new BSTNode<number>(0, node.left);
  node.right.right = new BSTNode<number>(6, node.right);
  node.right.left = new BSTNode<number>(4, node.right);

  t.is(node.size, 6);
});

test('tree node height returns 1 for just itself', t => {
  const node = new BSTNode<number>(1);

  t.is(node.height, 1);
});

test('tree node height returns 2 for a node with children', t => {
  const node = new BSTNode<number>(1);

  node.left = new BSTNode<number>(0, node);
  node.right = new BSTNode<number>(2, node);

  t.is(node.height, 2);
});

test('tree node height returns the number of levels of a tree', t => {
  const node = new BSTNode<number>(1);

  node.left = new BSTNode<number>(1, node);
  node.right = new BSTNode<number>(5, node);
  node.left.left = new BSTNode<number>(0, node.left);
  node.right.right = new BSTNode<number>(6, node.right);
  node.right.left = new BSTNode<number>(4, node.right);

  t.is(node.height, 3);
});

test('tree node isLeaf returns true for a single tree node', t => {
  const node = new BSTNode<number>(1);

  t.is(node.isLeaf(), true);
});

test('tree node isLeaf returns false for a node with children', t => {
  const node = new BSTNode<number>(1);

  node.left = new BSTNode<number>(0, node);

  t.is(node.isLeaf(), false);
});

test('can set the tree node data using the data property', t => {
  const node = new BSTNode<number[]>([1, 2]);

  const newData = [2, 3];
  node.data = newData;

  t.deepEqual(node.data, [2, 3]);
  t.not(node.data, newData);
});
