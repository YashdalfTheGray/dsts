import test from 'ava';

import { EmptyListError, IndexOutOfBoundsError } from './customErrors';
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

test('can remove a node from the end', t => {
  const ll = new LinkedList<number>();

  ll.shift(4)
    .shift(10)
    .shift(14);

  t.is(ll.length, 3);
  t.is(ll.pop(), 4);
  t.deepEqual([...ll], [14, 10]);
});

test('can remove a node from a longer list', t => {
  const ll = new LinkedList<number>();

  ll.shift(4)
    .shift(10)
    .shift(14)
    .push(21)
    .shift(33)
    .push(46);

  t.is(ll.length, 6);
  t.is(ll.pop(), 46);
  t.deepEqual([...ll], [33, 14, 10, 4, 21]);
});

test('can pop the last node', t => {
  const ll = new LinkedList<number>();

  ll.shift(4);

  t.is(ll.length, 1);
  t.is(ll.pop(), 4);
  t.deepEqual([...ll], []);
});

test('popping from empty throws an error', t => {
  const ll = new LinkedList<number>();

  t.throws(() => ll.pop());
});

test('can get at a specific index', t => {
  const ll = new LinkedList<number>();

  ll.push(4)
    .push(10)
    .push(14)
    .push(21);

  t.is(ll.getAt(2), 14);
});

test('getAt throws an error for index larger than length', t => {
  const ll = new LinkedList<number>();

  ll.push(4)
    .push(10)
    .push(14)
    .push(21);

  const error = t.throws(() => ll.getAt(8));
  t.assert(error instanceof IndexOutOfBoundsError);
});

test('getAt throws an error for empty list', t => {
  const ll = new LinkedList<number>();

  const error = t.throws(() => ll.getAt(8));
  t.assert(error instanceof EmptyListError);
});

test('is an iterable', t => {
  const ll = new LinkedList<number>();

  t.deepEqual([...ll], []);
});

test('returns items through iterator', t => {
  const ll = new LinkedList<number>();

  ll.push(4)
    .push(10)
    .push(14);

  let runCount = 0;
  for (const n of ll) {
    t.assert(typeof n === 'number');
    runCount += 1;
  }

  t.is(runCount, 3);
});
