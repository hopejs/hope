import { createFragment } from '@/renderer/render';

export enum DynamicFlags {
  TEXT = 1,
  CLASS = 1 << 1,
  STYLE = 1 << 2,
  PROP = 1 << 3,
  ATTR = 1 << 4,
  EVENT = 1 << 5,
  /** Children have dynamic nodes */
  CHILDREN = 1 << 6,
}

export type HostElement = (HTMLElement | SVGAElement) & {
  _flag?: DynamicFlags;
  _ParentNode?: HostElement;
};

export enum RenderType {
  NORMAL,
  NO_BLOCK,
}

export interface RenderTree {
  /** type */
  t: RenderType;
  /** currentElement */
  ce: HostElement | null;
  /** currentContainer */
  cc: ParentNode | null;
  /** fragment */
  f: DocumentFragment | null;
  /** parent */
  p?: RenderTree;
  /** children */
  c?: RenderTree[];
  /** onMount */
  om?: (() => void)[] | null;
}

let currentRenderTree: RenderTree | null = null;

export const makeRenderTree = (block: (renderTree: RenderTree) => void) => {
  initRender();
  block(currentRenderTree!);
  closeRender();
};

export const setCurrentRender = (
  value: RenderTree | null,
  container?: ParentNode
) => {
  currentRenderTree = value;
  container && currentRenderTree && (currentRenderTree.cc = container!);
};
export const getCurrentRender = () => currentRenderTree;
export const addMountedHander = (handler: () => void) =>
  isNoBlock() ||
  (currentRenderTree &&
    (currentRenderTree.om || (currentRenderTree.om = [])).push(handler));

const initRender = () => {
    const parent = currentRenderTree;
    currentRenderTree = {
      ce: null,
      cc: null,
      f: null,
      t: RenderType.NORMAL,
    };
    if (parent) {
      (parent.c || (parent.c = [])).push(currentRenderTree),
        (currentRenderTree.p = parent);
    }
  },
  closeRender = () => {
    currentRenderTree = currentRenderTree!.p || null;
  };

export const getCurrentElement = () =>
  currentRenderTree && currentRenderTree.ce;

export const getCurrentContainer = () => {
  return (
    currentRenderTree &&
    (currentRenderTree.cc ||
      currentRenderTree.f ||
      (currentRenderTree.f = createFragment()))
  );
};

export const getFragment = () => {
  return (
    currentRenderTree &&
    (currentRenderTree.f || (currentRenderTree.f = createFragment()))
  );
};

export const setCurrentElement = (el: HostElement | null) => {
  currentRenderTree && (currentRenderTree.ce = el);
};
export const setCurrentContainer = (
  el: ParentNode | DocumentFragment | null
) => {
  currentRenderTree && (currentRenderTree.cc = el);
};

/**
 * 1. hIf and hFor do not need to be executed.
 * 2. No registration life cycle is required.
 * 3. No need to register watcher.
 */
export const isNoBlock = () => {
  return currentRenderTree?.t === RenderType.NO_BLOCK;
};

export const markFlag = (el: HostElement, flag: DynamicFlags) => {
  const run = (element: HostElement, f: DynamicFlags) =>
    '_flag' in element ? (element._flag! |= f) : (element._flag = f);
  if (isNoBlock()) {
    run(el, flag);
    while ((el = el._ParentNode as any)) {
      run(el, DynamicFlags.CHILDREN);
    }
  }
};
