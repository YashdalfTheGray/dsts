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

export default class HashTable<K, V> {
  private list: LinkedList<KeyValuePair<K, V>>[];

  constructor(private hashFunc: HashFunction<K>, private buckets: number = 16) {
    this.list = [];
  }

  public put(key: K, value: V): this {
    const index = this.hashFunc(key) % this.buckets;

    if (!this.list[index]) {
      this.list[index] = new LinkedList<KeyValuePair<K, V>>();
    }

    this.list[index].push({ key, value });

    return this;
  }
}
