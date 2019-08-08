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
      this.head.next = null;
    } else {
      const temp = this.head.next;
      this.head = new ListNode(data);
      this.head.next = temp;
    }
    this.length += 1;
    return this;
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
