import test from 'ava';

import HashTable, { numberHashCode, stringHashCode } from './HashTable';

test('string hash returns a number', t => {
  const hash = stringHashCode('testtest');

  t.assert(typeof hash === 'number');
});

test('string hash returns different for slightly different strings', t => {
  const hash1 = stringHashCode('testtest1');
  const hash2 = stringHashCode('testtest2');

  t.not(hash1, hash2);
});

test('string hash returns the same hash for the same string', t => {
  const hash1 = stringHashCode('testtest1');
  const hash2 = stringHashCode('testtest1');

  t.is(hash1, hash2);
});

test('string hash for empty string is 0', t => {
  const hash = stringHashCode('');

  t.is(hash, 0);
});

test('number hash returns a number', t => {
  const hash = numberHashCode(12345);

  t.assert(typeof hash === 'number');
});

test('number hash returns different for slightly different numbers', t => {
  const hash1 = numberHashCode(45678);
  const hash2 = numberHashCode(45679);

  t.not(hash1, hash2);
});

test('number hash returns the same hash for the same number', t => {
  const hash1 = numberHashCode(45678);
  const hash2 = numberHashCode(45678);

  t.is(hash1, hash2);
});

test('takes in a hash function', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  t.assert(ht instanceof HashTable);
});

test('size property returns the current size', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('key1', 100);

  t.is(ht.size, 1);
});

test('size property returns 0 for empty list', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  t.is(ht.size, 0);
});
