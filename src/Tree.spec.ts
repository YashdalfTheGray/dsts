import test from 'ava';

import Tree, { EmptyTreeError } from './Tree';

test('can create a new tree', t => {
  const tr = new Tree<number>();

  t.assert(tr instanceof Tree);
});

test('can take an optional tree root node data', t => {
  const tr = new Tree<number>(1);

  t.assert(tr instanceof Tree);
});

test('can add nodes to the tree given a specific parent using depth first', t => {
  const tr = new Tree<number>(1);

  tr.add(2, 1);

  t.is(tr.size, 2);
  t.is(tr.search(n => n.data === 1)!.children[0].data, 2);
});
