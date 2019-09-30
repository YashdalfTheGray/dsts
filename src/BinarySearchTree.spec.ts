import test from 'ava';

import BinarySearchTree, { numericCompare } from './BinarySearchTree';

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
    .add(4);

  t.is(bst.size, 4);
  t.is(bst.height, 3);
});
