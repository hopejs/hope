import { useBlock } from '@/lifecycle/useBlock';

export const hIf = <T>(
  cond: T | (() => T),
  handleTrue: (value: T) => void,
  handleFalse?: (value: T) => void
) => {
  useBlock(cond, (value) => {
    value ? handleTrue(value) : handleFalse?.(value);
  });
};
