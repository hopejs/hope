import { getCurrentFragment, makeFragment } from '@/lifecycle/makeFragment';
import { removeNodes, useBlockTree } from '@/lifecycle/useBlockTree';

export const hFor = <T>(
  list: T[] | (() => T[]),
  item: (
    key: (value: string | number) => void,
    value: T,
    index: number,
    array: T[]
  ) => void
) => {
  useBlockTree(list, (value, blockTree) => {
    blockTree && removeNodes(blockTree);
    value.forEach((value, index, array) => {
      makeFragment((key: (value: string | number) => void) => {
        if (blockTree) {
          (blockTree.f || (blockTree.f = [])).push(getCurrentFragment()!);
        }
        item(key, value, index, array);
      });
    });
  });
};
