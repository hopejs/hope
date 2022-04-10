import { useBlock } from '@/lifecycle/useBlock';

export const hFor = <T>(
  list: T[] | (() => T[]),
  item: (value: T, index: number, array: T[]) => void
) => {
  useBlock(list, (value) => {
    value.forEach(item);
  });
};
