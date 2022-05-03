import {
  getCurrentContainer,
  HostElement,
  isNoBlock,
} from '@/html/makeRenderTree';
import { error } from '@/log';
import { createComment, createText, insert } from '@/renderer';

export interface BlockTree {
  start: Node;
  end: Node;
  /** container */
  ct: ParentNode;
  /** parent */
  p?: BlockTree;
  /** children */
  c?: BlockTree[] | null;
  /** onUnmount */
  oum?: (() => void)[] | null;
  /** nodes */
  ns?: Node[] | null;
  /** clone node list */
  cns?: Node[] | null;
  /** clone node */
  cn?: Node | null;
  /** next clone node key */
  ncnk?: 'firstChild' | 'nextSibling' | number;
}

let currentBlock: BlockTree | null = null;

export const makeBlockTree = (block: () => void) => {
  const start = createPlaceholderNode('block start');
  const end = createPlaceholderNode('block end');
  const container = getCurrentContainer();
  if (__DEV__ && container === null) {
    return error(
      `Must be passed to the render function as a component for rendering.`
    );
  }

  initBlock(start, end, container!);
  insert(start, container!);
  insert(end, container!);
  block();
  closeBlock();
};

export const setCurrentBlock = (value: BlockTree | null) => {
  currentBlock = value;
};

const initBlock = (start: Node, end: Node, container: ParentNode) => {
  const parent = currentBlock;
  currentBlock = Object.create(null) as BlockTree;
  currentBlock.start = start;
  currentBlock.end = end;
  currentBlock.ct = container;
  if (parent) {
    (parent.c || (parent.c = [])).push(currentBlock);
    currentBlock.p = parent;
  }
};

const closeBlock = () => {
  currentBlock = currentBlock?.p || null;
};

export const getCurrentBlock = () => currentBlock;

export const addUnmountedHandler = (handler: () => void) =>
  isNoBlock() ||
  (currentBlock && (currentBlock.oum || (currentBlock.oum = [])).push(handler));

const createPlaceholderNode = (text: string) =>
  __DEV__ ? createComment(text) : createText('');

export const pushNodeToCurrentBlock = (node: Node) => {
  if (currentBlock) {
    (currentBlock.ns || (currentBlock.ns = [])).push(node);
  }
};

export const internalInsert = (
  el: HostElement | DocumentFragment,
  container: ParentNode | DocumentFragment
) => {
  currentBlock && currentBlock.ct === container
    ? insert(el, container, currentBlock.end)
    : insert(el, container);
};
