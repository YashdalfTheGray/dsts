import { cloneDeep } from 'lodash';

export default class ListNode<T> {
  constructor(private data: T, public next: ListNode<T> | null = null) {
    this.setData(data);
  }

  public setData(data: T) {
    this.data = cloneDeep(data);
  }

  public getData(): T {
    return cloneDeep(this.data);
  }
}
