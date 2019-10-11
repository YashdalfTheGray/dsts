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

export class EmptyTreeError extends Error {
  constructor() {
    super('Tree is empty');
  }
}

export class EmptyTableError extends Error {
  constructor() {
    super('The table is empty');
  }
}

export class KeyNotFoundError extends Error {
  constructor(key: string) {
    super(`Key ${key} was not found in the table`);
  }
}

export class ListEmptyError extends Error {
  constructor() {
    super('The list is empty');
  }
}

export class IndexOutOfBoundsError extends Error {
  constructor() {
    super('Index is out of bounds');
  }
}
