import { block, BlockTypes } from '../block';

export function hFor<T>(
  value: T[] | (() => T[]),
  range: (item: T, index: number) => void
) {
  block<T>(BlockTypes.hFor, value, range);
}
