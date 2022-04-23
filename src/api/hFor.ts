import { BlockTree, getCurrentBlock } from '@/lifecycle/makeBlockTree';
import { keepEnv } from '@/lifecycle/useBlockTree';
import { insert, nextSibling } from '@/renderer';
import { isFunction } from '@/utils';
import { hIf } from './hIf';

export const hFor = <T>(
  getList: T[] | (() => T[]),
  handler: (item: T, getIndex: () => number, getArray: () => T[]) => void
) => {
  if (isFunction(getList)) {
    const cacheOldIndex = new Map(),
      cacheNewIndex = new Map(),
      cacheOldBlock = new Map();
    let oldList: T[] = [],
      newList: T[] = [],
      oldBlockList: BlockTree[] = [],
      newBlockList: BlockTree[] = [];
    keepEnv(getList, (list) => {
      newList = list;
      newBlockList = [];
      if (list.length === 0) {
        cacheOldBlock.clear();
        cacheOldIndex.clear();
        oldList = [];
        oldBlockList = [];
        return;
      }
      if (oldList.length > 0) {
        newList.forEach((item, index) => {
          cacheNewIndex.set(item, index);
        });
        const length = Math.max(newList.length, oldList.length);
        for (let index = 0; index < length; index++) {
          let item = newList[index];
          let oldItem = oldList[index];

          if (item === void 0 && oldItem === void 0) {
            break;
          }

          if (item === oldItem) {
            newBlockList.push(cacheOldBlock.get(item));
            continue;
          }
          if (item === void 0) {
            cacheOldIndex.delete(oldItem);
            cacheOldBlock.delete(oldItem);
            oldList.splice(index, 1);
            oldBlockList.splice(index, 1);
            index--;
            continue;
          }
          // Relevant elements will be deleted in hIf
          if (!cacheNewIndex.has(oldItem)) {
            cacheOldIndex.delete(oldItem);
            cacheOldBlock.delete(oldItem);
            oldList.splice(index, 1);
            oldBlockList.splice(index, 1);
            if (oldList[index] === item) {
              newBlockList.push(cacheOldBlock.get(item));
              continue;
            }
          }
          // Change the order of elements
          if (oldList.length > 0 && cacheOldIndex.has(item)) {
            const oldIndex = cacheOldIndex.get(item),
              block = cacheOldBlock.get(item),
              anchor = oldBlockList[index].start;
            cacheOldIndex.set(item, index);
            newBlockList.push(block);

            move(block, anchor);
            oldList.splice(oldIndex, 1);
            oldList.splice(index, 0, item);
            oldBlockList.splice(oldIndex, 1);
            oldBlockList.splice(index, 0, block);
          }
          // Create new elements
          else {
            const currentBlock = getCurrentBlock()!;
            const oldAnchor = currentBlock.end;
            // Where it should be inserted
            const newAnchor = oldBlockList[index]?.start;
            if (newAnchor) {
              currentBlock.end = newAnchor;
            }
            const newBlock = createNewItem(
              cacheOldIndex,
              cacheOldBlock,
              () => newBlockList,
              item,
              index,
              () => newList,
              handler
            );
            oldList.splice(index, 0, item);
            oldBlockList.splice(index, 0, newBlock);
            currentBlock.end = oldAnchor;
          }
        }
        cacheNewIndex.clear();
      } else {
        newList!.forEach((item, index) => {
          createNewItem(
            cacheOldIndex,
            cacheOldBlock,
            () => newBlockList,
            item,
            index,
            () => newList,
            handler
          );
        });
      }

      oldList = newList;
      oldBlockList = newBlockList;
    });
  } else {
    getList.forEach((item, index, array) => {
      handler(
        item,
        () => index,
        () => array
      );
    });
  }
};

function createNewItem(
  cacheIndex: Map<any, number>,
  cacheBlock: Map<any, BlockTree>,
  getBlockList: () => BlockTree[],
  item: any,
  index: number,
  getList: () => any[],
  handler: (item: any, getIndex: () => number, getArray: () => any[]) => void
) {
  let currentBlock: BlockTree;
  const blockList = getBlockList();
  cacheIndex.set(item, index);
  hIf(
    () => cacheIndex.has(item),
    () => {
      currentBlock = getCurrentBlock()!;
      handler(item, () => cacheIndex.get(item)!, getList);
    }
  );

  blockList.push(currentBlock!);
  cacheBlock.set(item, currentBlock!);
  return currentBlock!;
}

function move(block: BlockTree, anchor: Node) {
  let current = block.start,
    next = nextSibling(current)!,
    parent = current.parentNode;

  while (next !== block.end) {
    insert(current, parent!, anchor);
    current = next;
    next = nextSibling(next)!;
  }

  insert(current, parent!, anchor);
}
