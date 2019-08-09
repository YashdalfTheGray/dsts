import { ListNode } from '.';

export default class LinkedList<T> {
  private head: ListNode<T> | null;
  private listLength: number;

  constructor() {
    this.head = null;
    this.listLength = 0;
  }

  public get length() {
    return this.listLength;
  }

  public shift(data: T): this {
    if (this.head === null) {
      this.head = new ListNode(data);
    } else {
      const temp = this.head.next;
      this.head = new ListNode(data, temp);
    }
    this.listLength += 1;
    return this;
  }

  public unshift(): T {
    if (this.head === null) {
      throw new Error('The list is empty');
    }

    const temp = this.head;
    this.head = this.head.next;
    this.listLength -= 1;
    return temp.getData();
  }

  public *[Symbol.iterator]() {
    if (this.head === null) {
      return null;
    }

    let node: ListNode<T> | null = this.head;

    while (node !== null) {
      yield node.getData();
      node = node.next;
    }

    return null;
  }
}
