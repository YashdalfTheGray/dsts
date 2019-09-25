import test from 'ava';

import Tree, { EmptyTreeError, NodeNotFoundError } from './Tree';
import TreeNode from './TreeNode';

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

test('returns 0 as size for basically uninitialized tree', t => {
  const tr = new Tree<number>();

  t.is(tr.size, 0);
});

test('returns 1 for height with a single node', t => {
  const tr = new Tree<number>(1);

  t.is(tr.height, 1);
});

test('returns 0 as height for basically uninitialized tree', t => {
  const tr = new Tree<number>();

  t.is(tr.height, 0);
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

test('add child to node allows child to be added directly', t => {
  const tr = new Tree<number>(1);

  const root = tr.search(n => n.data === 1);
  tr.addNodeChild(2, root);

  t.is(tr.size, 2);
  t.is(tr.height, 2);
});

test('add child uses the root if no parent is given', t => {
  const tr = new Tree<number>(1);

  tr.addNodeChild(2);

  t.is(tr.size, 2);
  t.is(tr.height, 2);
});

test('add child throws if the parent is null', t => {
  const tr = new Tree<number>(1);

  t.throws(() => tr.addNodeChild(2, null));
});

test('add child throws an error if parent not found', t => {
  const tr = new Tree<number>(1);

  const err = t.throws(() => tr.addNodeChild(3, null));
  t.assert(err instanceof NodeNotFoundError);
});

test('add child throws if the parent is not a node', t => {
  const tr = new Tree<number>(1);

  t.throws(() => tr.addNodeChild(2, (3 as unknown) as TreeNode<number>));
});

test('search returns the node if found', t => {
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

test('search returns the node if found using breadth first', t => {
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

test('depth first search with an empty tree throws an error', t => {
  const tr = new Tree<number>();

  const err = t.throws(() => tr.search(n => n.data === 6));
  t.assert(err instanceof EmptyTreeError);
});

test('breadth first search with an empty tree throws an error', t => {
  const tr = new Tree<number>(undefined, Tree.TraversalStrageies.BREADTH_FIRST);

  const err = t.throws(() => tr.search(n => n.data === 6));
  t.assert(err instanceof EmptyTreeError);
});
