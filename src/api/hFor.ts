import { isNoBlock, makeRenderTree, RenderType } from '@/html/makeRenderTree';
import { removeNodes, useBlockTree } from '@/lifecycle/useBlockTree';

export const hFor = <T>(
  list: T[] | (() => T[]),
  item: (value: T, index: number, array: T[]) => void
) => {
  if (isNoBlock()) return;
  useBlockTree(list, (value, blockTree) => {
    blockTree && removeNodes(blockTree);
    value.forEach((value, index, array) => {
      item(value, index, array);
    });
  });
};

export const renderWithoutBlock = (component: () => void): DocumentFragment => {
  let result: DocumentFragment;
  makeRenderTree((renderTree) => {
    renderTree.t = RenderType.NO_BLOCK;
    component();
    result = renderTree.f!;
  });
  return result!;
};
