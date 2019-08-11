import test from 'ava';

import LinkedList from './LinkedList';

test('starts with no nodes', t => {
  const ll = new LinkedList();

  t.is(ll.length, 0);
});

test('can add a node to the start of empty list', t => {
  const ll = new LinkedList<number>();

  ll.shift(4);

  t.is(ll.length, 1);
  t.deepEqual([...ll], [4]);
});

test('can add a node to the start of non-empty list', t => {
  const ll = new LinkedList<number>();

  ll.shift(4).shift(10);
  t.is(ll.length, 2);

  ll.shift(19);
  t.is(ll.length, 3);
  t.deepEqual([...ll], [19, 10, 4]);
});

test('can remove a node from the start', t => {
  const ll = new LinkedList<number>();

  ll.shift(4).shift(10);

  t.is(ll.length, 2);
  t.is(ll.unshift(), 10);
  t.deepEqual([...ll], [4]);
});

test('can remove the last node', t => {
  const ll = new LinkedList<number>();

  ll.shift(4);

  t.is(ll.length, 1);
  t.is(ll.unshift(), 4);
  t.deepEqual([...ll], []);
});

test('removing from empty throws an error', t => {
  const ll = new LinkedList<number>();

  t.throws(() => ll.unshift());
});

test('can add to the end of an empty list', t => {
  const ll = new LinkedList<number>();

  ll.push(4);

  t.is(ll.length, 1);
  t.deepEqual([...ll], [4]);
});

test('can add to the end of a list with one thing in it', t => {
  const ll = new LinkedList<number>();

  ll.push(4).push(10);

  t.is(ll.length, 2);
  t.deepEqual([...ll], [4, 10]);
});

test('can add to the end of a list with many things in it', t => {
  const ll = new LinkedList<number>();

  ll.push(4)
    .push(10)
    .push(14)
    .push(21)
    .push(33)
    .push(46);

  t.is(ll.length, 6);
  t.deepEqual([...ll], [4, 10, 14, 21, 33, 46]);
});
