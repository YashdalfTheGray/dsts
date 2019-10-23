import test from 'ava';

import { EmptyQueueError } from './errors';
import Queue from './Queue';

test('can create a new Queue', t => {
  const q = new Queue<number>();

  t.assert(q instanceof Queue);
});

test('enqueue puts stuff in the queue', t => {
  const q = new Queue<number>();

  q.enqueue(4);

  t.is(q.size, 1);
  t.is(q.peek(), 4);
});

test('dequeue pulls stuff out of the queue', t => {
  const q = new Queue<number>();

  q.enqueue(4).enqueue(3);

  t.is(q.dequeue(), 4);
  t.is(q.size, 1);
});

test('dequeue throws an error if there is nothing in the queue', t => {
  const q = new Queue<number>();

  const error = t.throws(() => q.dequeue());
  t.assert(error instanceof EmptyQueueError);
});

test('peek returns a copy of the top of the queue', t => {
  const q = new Queue<number[]>();

  q.enqueue([1, 2]).enqueue([3, 4]);
  const peek = q.peek();

  t.deepEqual(peek, [1, 2]);
  t.not(peek, q.peek());
});

test('peek throws if the queue is empty', t => {
  const q = new Queue<number[]>();

  t.throws(() => q.peek());
});

test('isEmpty returns true for an empty queue', t => {
  const q = new Queue<number>();

  t.is(q.isEmpty(), true);
});

test('isEmpty returns false for a queue with stuff', t => {
  const q = new Queue<number>();

  q.enqueue(1).enqueue(2);

  t.is(q.isEmpty(), false);
});

test('size returns 0 for an empty queue', t => {
  const q = new Queue<number>();

  t.is(q.size, 0);
});

test('size returns the size for a queue with stuff', t => {
  const q = new Queue<number>();

  q.enqueue(1).enqueue(2);

  t.is(q.size, 2);
});
