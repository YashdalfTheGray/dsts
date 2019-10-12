// tslint:disable:max-classes-per-file
export class DuplicateNodeError<T> extends Error {
  constructor(data: T) {
    super(
      `A node with the following data already exists in the tree.\n${data}`
    );
  }
}

export class NodeNotFoundError extends Error {
  constructor() {
    super('Node was not found in the tree');
  }
}

export class KeyNotFoundError extends Error {
  constructor(key: string) {
    super(`Key ${key} was not found in the table`);
  }
}

export class IndexOutOfBoundsError extends Error {
  constructor() {
    super('Index is out of bounds');
  }
}

class EmptyDataStructureError extends Error {
  constructor(name: string) {
    super(`The ${name} is empty`);
  }
}

export class EmptyTreeError extends EmptyDataStructureError {
  constructor() {
    super('tree');
  }
}

export class EmptyTableError extends EmptyDataStructureError {
  constructor() {
    super('table');
  }
}

export class EmptyListError extends EmptyDataStructureError {
  constructor() {
    super('list');
  }
}

export class EmptyQueueError extends EmptyDataStructureError {
  constructor() {
    super('queue');
  }
}

export class EmptyStackError extends EmptyDataStructureError {
  constructor() {
    super('stack');
  }
}
