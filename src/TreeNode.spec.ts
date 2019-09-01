import test from 'ava';

import TreeNode from './TreeNode';

test('tree node can take data, parent and children', t => {
  const parent = new TreeNode<number>(1);

  const node = new TreeNode<number>(2, parent, []);
  t.is(node.data, 2);
  t.is(node.parent!.data, 1);
});

test('tree node has sane defaults for parents and children', t => {
  const node = new TreeNode<number>(2);

  t.is(node.data, 2);
  t.is(node.parent, null);
  t.deepEqual(node.children, []);
});
