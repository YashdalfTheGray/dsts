import LinkedList from './LinkedList';

export type KeyValuePair<K, V> = {
  key: K;
  value: V;
};

export type HashFunction<K> = (key: K) => number;

export function stringHashCode(str: string): number {
  return Array.from(str).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );
}

export function numberHashCode(num: number): number {
  return stringHashCode(num.toFixed(0));
}

export class EmptyTableError extends Error {
  constructor() {
    super('The table is empty');
  }
}

export class KeyNotFoundError extends Error {
  constructor(key: string) {
    super(`Key ${key} was not found in the table`);
  }
}

export default class HashTable<K, V> {
  private list: LinkedList<KeyValuePair<K, V>>[];

  constructor(private hashFunc: HashFunction<K>, private buckets: number = 16) {
    this.list = [];
  }

  get size(): number {
    return this.list.reduce((sum, l) => sum + l.length, 0);
  }

  public put(key: K, value: V): this {
    const index = this.hashFunc(key) % this.buckets;

    if (!this.list[index]) {
      this.list[index] = new LinkedList<KeyValuePair<K, V>>();
    }

    this.list[index].push({ key, value });

    return this;
  }

  public get(key: K): V {
    if (this.list.length === 0) {
      throw new EmptyTableError();
    }

    const index = this.hashFunc(key) % this.buckets;

    for (let kv of this.list[index]) {
      if (kv && kv.key === key) {
        return kv.value;
      }
    }

    throw new KeyNotFoundError(`${key}`);
  }

  public containsKey(key: K): boolean {
    const item = this.list[this.hashFunc(key) % this.buckets];
    return item ? item.length !== 0 : false;
  }

  public isEmpty(): boolean {
    return this.list.length === 0;
  }

  public *[Symbol.iterator]() {
    if (this.list.length === 0) {
      return null;
    }

    for (let item of this.list) {
      for (let kv of item) {
        yield kv;
      }
    }
  }
}
