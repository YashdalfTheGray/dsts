import test from 'ava';

import Queue, { EmptyQueueError } from './Queue';

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
