import test from 'ava';

import HashTable, {
  EmptyTableError,
  KeyNotFoundError,
  numberHashCode,
  stringHashCode
} from './HashTable';

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

test('takes in a number of buckets', t => {
  const ht = new HashTable<string, number>(stringHashCode, 1);

  ht.put('foo', 1);
  ht.put('bar', 2);

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

test('isEmpty returns true for empty table', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  t.is(ht.isEmpty(), true);
});

test('isEmpty returns false for empty table', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('foo', 1);

  t.is(ht.isEmpty(), false);
});

test('containsKey returns true when a key exists', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('foo', 1);
  ht.put('bar', 2);

  t.is(ht.containsKey('foo'), true);
});

test('containsKey returns false when a key exists', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('foo', 1);
  ht.put('bar', 2);

  t.is(ht.containsKey('baz'), false);
});

test('put adds a key value pair', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('foo', 1);

  t.is(ht.size, 1);
  t.deepEqual([...ht], [{ key: 'foo', value: 1 }]);
});

test('get returns a value by key', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('foo', 1);

  t.deepEqual(ht.get('foo'), 1);
});

test('get throws for empty table', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  const error = t.throws(() => ht.get('foo'));
  t.assert(error instanceof EmptyTableError);
});

test('get throws for missing key', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('foo', 1);

  const error = t.throws(() => ht.get('bar'));
  t.assert(error instanceof KeyNotFoundError);
});

test('is an iterable', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  t.deepEqual([...ht], []);
});

test('returns items through iterator', t => {
  const ht = new HashTable<string, number>(stringHashCode);

  ht.put('foo1', 4)
    .put('foo2', 10)
    .put('foo3', 14);

  let runCount = 0;
  for (const kv of ht) {
    t.assert(typeof kv === 'object');
    runCount += 1;
  }

  t.is(runCount, 3);
});
