import { EmptyTableError, KeyNotFoundError } from './errors';
import LinkedList from './LinkedList';
import { HashFunction, IKeyValuePair } from './utils';

export default class HashTable<K, V> {
  private list: Array<LinkedList<IKeyValuePair<K, V>>>;

  constructor(private hashFunc: HashFunction<K>, private buckets: number = 16) {
    this.list = [];
  }

  get size(): number {
    return this.list.reduce((sum, l) => sum + l.length, 0);
  }

  public put(key: K, value: V): this {
    const index = this.hashFunc(key) % this.buckets;

    if (!this.list[index]) {
      this.list[index] = new LinkedList<IKeyValuePair<K, V>>();
    }

    this.list[index].push({ key, value });

    return this;
  }

  public get(key: K): V {
    if (this.list.length === 0) {
      throw new EmptyTableError();
    }

    const index = this.hashFunc(key) % this.buckets;

    if (this.list[index]) {
      for (const kv of this.list[index]) {
        if (kv!.key === key) {
          return kv!.value;
        }
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

    for (const item of this.list) {
      if (item) {
        for (const kv of item) {
          yield kv;
        }
      }
    }
  }
}
