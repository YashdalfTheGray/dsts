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
