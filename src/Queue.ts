import { cloneDeep } from 'lodash';

export class EmptyQueueError extends Error {
  constructor() {
    super('The queue is empty');
  }
}

export default class Queue<T> {
  private list: T[];

  constructor() {
    this.list = [];
  }

  public enqueue(data: T): this {
    this.list.push(data);
    return this;
  }
}
