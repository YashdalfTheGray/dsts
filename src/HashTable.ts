import { LinkedList } from '.';

type KeyValuePair<K, V> = {
  key: K;
  value: V;
};

type HashFunction<K> = (key: K) => number;

export default class HashTable<K, V> {
  private list: LinkedList<KeyValuePair<K, V>>[];

  constructor(private hashFunc: HashFunction<K>) {}
}
