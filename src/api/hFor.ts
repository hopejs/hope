import { removeNodes, useBlockTree } from '@/lifecycle/useBlockTree';

export const hFor = <T>(
  list: T[] | (() => T[]),
  item: (value: T, index: number, array: T[]) => void
) => {
  useBlockTree(list, (value, blockTree) => {
    blockTree && removeNodes(blockTree);
    value.forEach((value, index, array) => {
      item(value, index, array);
    });
  });
};
