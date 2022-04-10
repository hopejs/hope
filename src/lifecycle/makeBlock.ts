import { getCurrentElement, getFragment } from '@/html';
import { createComment, createText, insert } from '@/renderer';

interface Block {
  start: Node;
  end: Node;
  /** parent */
  p?: Block;
  /** children */
  c?: Block[];
}

let currentBlock: Block | null = null;

export const makeBlock = (block: () => void) => {
  const start = createPlaceholderNode('block start');
  const end = createPlaceholderNode('block end');
  const container = getCurrentElement() || getFragment();

  initBlock(start, end);
  insert(start, container);
  block();
  insert(end, container);
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

const createPlaceholderNode = (text: string) =>
  __DEV__ ? createComment(text) : createText('');
