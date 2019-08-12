import { ListNode } from '.';

class ListEmptyError extends Error {
  constructor() {
    super('The list is empty');
  }
}

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
      const temp = this.head;
      this.head = new ListNode(data, temp);
    }
    this.listLength += 1;
    return this;
  }

  public unshift(): T {
    if (this.head === null) {
      throw new ListEmptyError();
    }

    const temp = this.head;
    this.head = this.head.next;
    this.listLength -= 1;
    return temp.getData();
  }

  public push(data: T): this {
    if (this.head === null) {
      return this.shift(data);
    } else if (this.head.next === null) {
      this.head.next = new ListNode(data);
    } else {
      let node = this.head;

      while (node.next !== null) {
        node = node.next;
      }

      node.next = new ListNode(data);
    }

    this.listLength += 1;
    return this;
  }

  public pop(): T {
    if (this.head === null) {
      throw new ListEmptyError();
    } else if (this.head.next === null) {
      const temp = this.head;
      this.head = null;
      this.listLength -= 1;
      return temp.getData();
    } else {
      let node = this.head;

      while (node.next !== null && node.next.next !== null) {
        node = node.next;
      }

      const temp = node.next!;
      node.next = null;
      this.listLength -= 1;
      return temp.getData();
    }
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
