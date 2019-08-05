import test from 'ava';

import testFunc from './index';

test('prints hello world when there is no name', t => {
  t.is(testFunc(), 'Hello, World!');
});

test('prints hello name when given a name', t => {
  t.is(testFunc('test'), 'Hello, test!');
});
