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
