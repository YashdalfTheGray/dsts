import test from 'ava';

import Stack, { EmptyStackError } from './Stack';

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

  s.push('this');
  s.push('that');

  t.is(s.length, 2);
  t.is(s.peek(), 'that');
});
