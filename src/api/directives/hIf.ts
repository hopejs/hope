import { block, BlockTypes } from '../block';

export function hIf(
  value: any | (() => any),
  range: () => void,
  elseRange: () => void
) {
  block(BlockTypes.hIf, value, range, elseRange);
}
