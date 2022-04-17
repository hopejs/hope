import { useBlockTree } from '@/lifecycle/useBlockTree';

export const hFor = <T>(
  list: T[] | (() => T[]),
  item: (value: T, index: number, array: T[]) => void
) => {
  useBlockTree(list, (value) => {
    value.forEach(item);
  });
};
