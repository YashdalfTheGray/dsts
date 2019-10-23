import test from 'ava';

import { EmptyStackError } from './errors';
import Stack from './Stack';

test('can create a new stack', t => {
  const s = new Stack<string>();

  t.assert(s instanceof Stack);
});

test('push pushes data onto the stack', t => {
  const s = new Stack<string>();

  s.push('this');

  t.is(s.length, 1);
  t.is(s.peek(), 'this');
});

test('push pushes more data onto the stack', t => {
  const s = new Stack<string>();

  s.push('this').push('that');

  t.is(s.length, 2);
  t.is(s.peek(), 'that');
});

test('push is fluent', t => {
  const s = new Stack<string>();

  t.assert(s.push('this') instanceof Stack);
});

test('pop returns the most recently pushed element', t => {
  const s = new Stack<string>();

  s.push('this').push('that');

  t.is(s.length, 2);
  t.is(s.pop(), 'that');
  t.is(s.length, 1);
});

test('pop throws an error if empty stack', t => {
  const s = new Stack<string>();

  const error = t.throws(() => s.pop());
  t.assert(error instanceof EmptyStackError);
});

test('peek returns a copy of the top of the stack', t => {
  const s = new Stack<number[]>();

  s.push([1, 2]).push([3, 4]);
  const peek = s.peek();

  t.deepEqual(peek, [3, 4]);
  t.not(s.peek(), peek);
});

test('peek throws an error if the stack is empty', t => {
  const s = new Stack<number>();

  t.throws(() => s.peek());
});

test('isEmpty returns true for an empty stack', t => {
  const s = new Stack<string>();

  t.is(s.isEmpty(), true);
});

test('isEmpty returns false for an stack with stuff', t => {
  const s = new Stack<string>();

  s.push('a').push('b');

  t.is(s.isEmpty(), false);
});
