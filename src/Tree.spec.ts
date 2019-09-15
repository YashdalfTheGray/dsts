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

test('can take an optional default traversal strategy', t => {
  const tr = new Tree<number>(1, Tree.TraversalStrageies.BREADTH_FIRST);

  t.assert(tr instanceof Tree);
});

test('returns 1 for size with a single node', t => {
  const tr = new Tree<number>(1);

  t.is(tr.size, 1);
});

test('returns 1 for height with a single node', t => {
  const tr = new Tree<number>(1);

  t.is(tr.height, 1);
});

test('add just defines the root if nothing is in the tree', t => {
  const tr = new Tree<number>();

  tr.add(1, 1);

  t.is(tr.size, 1);
  t.is(tr.contains(1), true);
});

test('can add nodes to the tree given a specific parent using depth first', t => {
  const tr = new Tree<number>(1);

  tr.add(2, 1);

  t.is(tr.size, 2);
  t.is(tr.search(n => n.data === 1)!.children[0].data, 2);
});

test('can add nodes to the tree given a specific parent using breadth first', t => {
  const tr = new Tree<number>(1);

  tr.add(2, 1, Tree.TraversalStrageies.BREADTH_FIRST);

  t.is(tr.size, 2);
  t.is(tr.search(n => n.data === 1)!.children[0].data, 2);
});

test.only('search returns the node if found', t => {
  const tr = new Tree<number>(1);

  tr.add(2, 1)
    .add(3, 1)
    .add(4, 1)
    .add(5, 4)
    .add(6, 5);

  const node = tr.search(n => n.data === 6);
  t.not(node, null);
  t.is(node!.data, 6);
});

test.only('search returns the node if found using breadth first', t => {
  const tr = new Tree<number>(1, Tree.TraversalStrageies.BREADTH_FIRST);

  tr.add(2, 1)
    .add(3, 1)
    .add(4, 1)
    .add(5, 4)
    .add(6, 5);

  const node = tr.search(n => n.data === 6);
  t.not(node, null);
  t.is(node!.data, 6);
});
