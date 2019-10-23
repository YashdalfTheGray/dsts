import { cloneDeep } from 'lodash';

import { EmptyQueueError } from './errors';

export default class Queue<T> {
  private list: T[];

  constructor() {
    this.list = [];
  }

  public enqueue(data: T): this {
    this.list.push(data);
    return this;
  }

  public dequeue(): T {
    if (this.list.length === 0) {
      throw new EmptyQueueError();
    }

    return this.list.shift()!;
  }

  public get size() {
    return this.list.length;
  }

  public peek(): T {
    if (this.list.length === 0) {
      throw new EmptyQueueError();
    }

    return cloneDeep(this.list[0]);
  }

  public isEmpty(): boolean {
    return this.list.length === 0;
  }
}
