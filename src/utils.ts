/**
 * If b should be to the right of a, then return 1.
 * If b should be to the left of a, return 0 or -1.
 */
export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export type HashFunction<K> = (key: K) => number;

export interface IKeyValuePair<K, V> {
  key: K;
  value: V;
}

export enum TraversalStrategies {
  BREADTH_FIRST,
  DEPTH_FIRST
}

export function stringHashCode(str: string): number {
  /* tslint:disable no-bitwise */
  return Array.from(str).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );
  /* tslint:enable no-bitwise */
}

export function numberHashCode(num: number): number {
  return stringHashCode(num.toFixed(0));
}

export const numericCompare: Comparator<number> = (a: number, b: number) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both a and b need to be numbers');
  }

  if (b < a) {
    return -1;
  } else if (a === b) {
    return 0;
  } else {
    return 1;
  }
};
