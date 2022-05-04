import {
  getCurrentContainer,
  HostElement,
  isNoBlock,
  makeRenderTree,
  RenderType,
} from '@/html/makeRenderTree';
import { BlockTree, internalInsert } from '@/lifecycle/makeBlockTree';
import { removeNodes, useBlockTree } from '@/lifecycle/useBlockTree';
import { cloneNode } from '@/renderer';

export const hFor = <T>(
  list: T[] | (() => T[]),
  item: (value: T, index: number, array: T[]) => void
) => {
  if (isNoBlock()) return;
  useBlockTree(list, (value, blockTree) => {
    const templates = (blockTree!.tns = value.length
        ? (Array.from(
            renderWithoutBlock(() => {
              item(value[0], 0, value);
            }).childNodes
          ) as HostElement[])
        : null),
      container = getCurrentContainer()!;
    blockTree && removeNodes(blockTree),
      value.forEach((value, index, array) => {
        const cloneTemplates: ChildNode[] = (blockTree!.cns = (
          templates as any
        ).map((item: ChildNode) => cloneNode(item)));
        blockTree!.ncnk = 0;
        item(value, index, array);
        for (const item of cloneTemplates) {
          internalInsert(item as any, container);
        }
        blockTree!.cns = blockTree!.cn = blockTree!.tn = null;
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

const getNextCloneNodeCommon = (
    node: any,
    nodeList: HostElement[],
    key: 'firstChild' | 'nextSibling' | number | string
  ) => {
    return typeof key !== 'number'
      ? (node[key] as HostElement | null)
      : (nodeList[key] as HostElement | null);
  },
  keyMap = {
    firstChild: '_fc',
    nextSibling: '_ns',
  };

export const getNextCloneNode = (
  currentBlock: BlockTree,
  nextKey: 'firstChild' | 'nextSibling' | number
) => {
  currentBlock.tn = getNextCloneNodeCommon(
    currentBlock.tn!,
    currentBlock.tns!,
    typeof nextKey !== 'number' ? keyMap[nextKey] : nextKey
  );
  return getNextCloneNodeCommon(currentBlock.cn!, currentBlock.cns!, nextKey);
};
