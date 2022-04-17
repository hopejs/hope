import { useBlockTree } from '@/lifecycle/useBlockTree';

export const hIf = <T>(
  cond: T | (() => T),
  handleTrue: (value: T) => void,
  handleFalse?: (value: T) => void
) => {
  useBlockTree(cond, (value) => {
    value ? handleTrue(value) : handleFalse?.(value);
  });
};
