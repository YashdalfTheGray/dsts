import test from 'ava';

import LinkedList from './LinkedList';

test('starts with no nodes', t => {
  const ll = new LinkedList();

  t.is(ll.length, 0);
});

test.only('can add a node', t => {
  const ll = new LinkedList<number>();

  ll.shift(4);

  t.is(ll.length, 1);
  t.deepEqual([...ll], [4]);
});
