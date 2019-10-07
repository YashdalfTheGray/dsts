import test from 'ava';

import BinarySearchTree, {
  DuplicateNodeError,
  numericCompare
} from './BinarySearchTree';

test('numeric compare is a function', t => {
  t.assert(typeof numericCompare === 'function');
});

test('numeric compare returns 0 for equality', t => {
  t.is(numericCompare(1, 1), 0);
});

test('numeric compare returns -1 for when b comes before a', t => {
  t.is(numericCompare(3, 1), -1);
});

test('numeric compare returns 1 for when a comes before b', t => {
  t.is(numericCompare(1, 3), 1);
});

test('numeric compare throws an error if a is not a number', t => {
  const error = t.throws(() => numericCompare(('a' as unknown) as number, 2));
  t.assert(error instanceof TypeError);
});

test('numeric compare throws an error if b is not a number', t => {
  const error = t.throws(() => numericCompare(1, ('b' as unknown) as number));
  t.assert(error instanceof TypeError);
});

test('binary search tree takes node data and compare function', t => {
  const bst = new BinarySearchTree<number>(1, numericCompare);

  t.assert(bst instanceof BinarySearchTree);
});

test('binary search tree add adds nodes to the tree', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst
    .add(2)
    .add(7)
    .add(4)
    .add(12)
    .add(6);

  t.is(bst.size, 6);
  t.is(bst.height, 3);
});

test('binary search tree add adds nodes to the right places', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst.add(2).add(8);
  const root = bst.search(5);

  t.is(root!.left.data, 2);
  t.is(root!.right.data, 8);
});

test('binary search tree add supports fluent syntax', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  t.assert(bst.add(3) instanceof BinarySearchTree);
});

test('binary search tree add throws an error if duplicate node is inserted', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  const error = t.throws(() => bst.add(5));
  t.assert(error instanceof DuplicateNodeError);
});

test('binary search tree search returns the correct node', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst
    .add(7)
    .add(6)
    .add(8)
    .add(3)
    .add(2)
    .add(4);
  const node = bst.search(4);

  t.is(node!.data, 4);
});

test('binary search tree search returns null if the node is not found', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst
    .add(7)
    .add(6)
    .add(8)
    .add(3)
    .add(2)
    .add(4);
  const node = bst.search(1);

  t.is(node, null);
});

test('binary search tree search returns null when parent only has a right child', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst.add(7);
  const node = bst.search(1);

  t.is(node, null);
});

test('binary search tree search returns null when parent only has a left child', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst.add(1);
  const node = bst.search(7);

  t.is(node, null);
});

test('binary search tree contains returns true when a node is found', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst.add(1);

  t.is(bst.contains(1), true);
});

test('binary search tree contains returns false when a node is not found', t => {
  const bst = new BinarySearchTree<number>(5, numericCompare);

  bst.add(1);

  t.is(bst.contains(7), false);
});
