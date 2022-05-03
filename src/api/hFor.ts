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
        cloneTemplates.forEach((item) =>
          internalInsert(item as any, container)
        );
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
  node: HostElement,
  nodeList: HostElement[],
  key: 'firstChild' | 'nextSibling' | number
) => {
  return typeof key !== 'number'
    ? (node[key] as HostElement | null)
    : (nodeList[key] as HostElement | null);
};

export const getNextCloneNode = (
  currentBlock: BlockTree,
  nextKey: 'firstChild' | 'nextSibling' | number
) => {
  currentBlock.tn = getNextCloneNodeCommon(
    currentBlock.tn!,
    currentBlock.tns!,
    nextKey
  );
  const result = getNextCloneNodeCommon(
    currentBlock.cn!,
    currentBlock.cns!,
    nextKey
  );

  result && currentBlock.tn && (result._flag = currentBlock.tn._flag);
  return result;
};
