import { cloneDeep } from 'lodash';

export class EmptyStackError extends Error {
  constructor() {
    super('The stack is empty');
  }
}

export default class Stack<T> {
  private list: T[];

  constructor() {
    this.list = [];
  }

  public push(data: T): this {
    this.list.push(data);
    return this;
  }

  public pop(): T {
    if (this.list.length === 0) {
      throw new EmptyStackError();
    }

    return this.list.pop()!;
  }

  public peek(): T {
    if (this.list.length === 0) {
      throw new EmptyStackError();
    }

    return cloneDeep(this.list[this.list.length - 1]);
  }

  public isEmpty(): boolean {
    return this.list.length === 0;
  }

  public get length() {
    return this.list.length;
  }
}
