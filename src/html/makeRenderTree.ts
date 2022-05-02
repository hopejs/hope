import { createFragment } from '@/renderer/render';

export type HostElement = HTMLElement | SVGAElement;

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
