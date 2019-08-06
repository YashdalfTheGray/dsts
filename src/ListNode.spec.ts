import test from 'ava';

import ListNode from './ListNode';

test('ListNode starts with given and null next', t => {
  const node = new ListNode<number>(5);
  t.is(node.getData(), 5);
  t.is(node.next, null);
});

test('ListNode clones the given data', t => {
  const testArray = [5, 3];
  const node = new ListNode<number[]>(testArray);

  testArray[0] = 6;
  testArray.push(4);

  t.deepEqual(node.getData(), [5, 3]);
});

test('ListNode allows data reassignment', t => {
  const node = new ListNode<string>('a');

  node.setData('b');

  t.is(node.getData(), 'b');
});

test('ListNode holds a reference to another node', t => {
  const node = new ListNode<string>('a');

  node.next = new ListNode('b');

  t.is(node.getData(), 'a');
  t.is(node.next.getData(), 'b');
});
