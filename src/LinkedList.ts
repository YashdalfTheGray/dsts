import { ListNode } from '.';

export default class LinkedList<T> {
  private head: ListNode<T> | null;
  public length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  public shift(data: T): this {
    if (this.head === null) {
      this.head = new ListNode(data);
    } else {
      const temp = this.head.next;
      this.head = new ListNode(data, temp);
    }
    this.length += 1;
    return this;
  }

  public unshift(): T {
    if (this.head === null) {
      throw new Error('The list is empty');
    }

    const temp = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return temp.getData();
  }

  public *[Symbol.iterator]() {
    if (this.head === null) {
      return null;
    }

    let node = this.head;

    while (!node.next !== null) {
      yield node.getData();
      if (node.next) {
        node = node.next;
      }
    }

    return null;
  }
}
