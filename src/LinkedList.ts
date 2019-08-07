import { ListNode } from '.';

export default class LinkedList<T> {
  private head: ListNode<T> | null;

  constructor() {
    this.head = null;
  }

  public shift(data: T) {
    if (this.head === null) {
      this.head = new ListNode(data);
      this.head.next = null;
    } else {
      const temp = this.head.next;
      this.head = new ListNode(data);
      this.head.next = temp;
    }
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
