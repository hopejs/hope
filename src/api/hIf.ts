import { removeNodes, useBlockTree } from '@/lifecycle/useBlockTree';

export const hIf = <T>(
  cond: T | (() => T),
  handleTrue: (value: T) => void,
  handleFalse?: (value: T) => void
) => {
  useBlockTree(cond, (value, blockTree) => {
    blockTree && removeNodes(blockTree);
    value ? handleTrue(value) : handleFalse?.(value);
  });
};
