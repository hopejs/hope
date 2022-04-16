import { getCurrentElement } from '@/html';
import { getFragment } from '@/html/h';
import { error } from '@/log';
import { createComment, createText, insert } from '@/renderer';

export interface Block {
  start: Node;
  end: Node;
  /** parent */
  p?: Block;
  /** children */
  c?: Block[] | null;
  /** onUnmount */
  oum?: (() => void)[] | null;
}

let currentBlock: Block | null = null;

export const makeBlock = (block: () => void) => {
  const start = createPlaceholderNode('block start');
  const end = createPlaceholderNode('block end');
  const container = getCurrentElement() || getFragment();
  if (__DEV__ && container === null) {
    return error(
      `Must be passed to the render function as a component for rendering.`
    );
  }

  initBlock(start, end);
  insert(start, container!);
  insert(end, container!);
  block();
  closeBlock();
};

const initBlock = (start: Node, end: Node) => {
  const parent = currentBlock;
  currentBlock = Object.create(null) as Block;
  currentBlock.start = start;
  currentBlock.end = end;
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
  currentBlock && (currentBlock.oum || (currentBlock.oum = [])).push(handler);

const createPlaceholderNode = (text: string) =>
  __DEV__ ? createComment(text) : createText('');
