import {
  getCurrentContainer,
  isNoBlock,
  makeRenderTree,
  RenderType,
} from '@/html/makeRenderTree';
import { internalInsert } from '@/lifecycle/makeBlockTree';
import { removeNodes, useBlockTree } from '@/lifecycle/useBlockTree';
import { cloneNode, firstChild, nextSibling } from '@/renderer';

export const hFor = <T>(
  list: T[] | (() => T[]),
  item: (value: T, index: number, array: T[]) => void
) => {
  if (isNoBlock()) return;
  useBlockTree(list, (value, blockTree) => {
    const template =
        value.length &&
        renderWithoutBlock(() => {
          item(value[0], 0, value);
        }),
      container = getCurrentContainer()!;
    blockTree && removeNodes(blockTree),
      value.forEach((value, index, array) => {
        const cloneTemplate = (blockTree!.cn = cloneNode(template as any));
        item(value, index, array);
        internalInsert(cloneTemplate as any, container);
        blockTree!.cn = null;
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

export const getNextCloneNode = (cloneNode: Node) => {
  let _firstChild: Node | null;
  return !(_firstChild = firstChild(cloneNode)) ||
    _firstChild.nodeType !== Node.ELEMENT_NODE ||
    //@ts-ignore
    _firstChild._ignore
    ? nextSibling(cloneNode)
    : _firstChild;
};
