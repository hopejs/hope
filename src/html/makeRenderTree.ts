import { ScopeTree } from '@/activity/makeScopeTree';

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
  /** only exist in the template node */
  /** Dynamic flag */
  _f?: DynamicFlags;
  /** parent node */
  _pn?: HostElement;
  /** firstChild */
  _fc?: HostElement;
  /** lastChild */
  _lc?: HostElement;
  /** nextSibling */
  _ns?: HostElement;
  /** scope tree */
  _st?: ScopeTree | null;
};

export enum RenderType {
  NORMAL,
  NO_BLOCK,
}

export interface RenderTree {
  /** root element */
  r: HostElement;
  /** type */
  t: RenderType;
  /** currentElement */
  ce: HostElement | null;
  /** currentContainer */
  cc: HostElement | null;
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
  container?: HostElement
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
      t: RenderType.NORMAL,
    } as any;
    if (parent) {
      (parent.c || (parent.c = [])).push(currentRenderTree!),
        (currentRenderTree!.p = parent);
    }
  },
  closeRender = () => {
    currentRenderTree = currentRenderTree!.p || null;
  };

export const getCurrentElement = () =>
  currentRenderTree && currentRenderTree.ce;

export const getCurrentContainer = () => {
  return currentRenderTree && (currentRenderTree.cc || currentRenderTree.r);
};

export const getRoot = () => {
  return currentRenderTree && currentRenderTree.r;
};

export const setCurrentElement = (el: HostElement | null) => {
  currentRenderTree && (currentRenderTree.ce = el);
};
export const setCurrentContainer = (el: HostElement | null) => {
  currentRenderTree && (currentRenderTree.cc = el);
};

/**
 * 1. hIf and hFor do not need to be executed.
 * 2. No registration life cycle is required.
 * 3. No need to register watcher.
 */
export const isNoBlock = () => {
  return !!currentRenderTree && currentRenderTree.t === RenderType.NO_BLOCK;
};

const runMarkFlag = (element: HostElement, f: DynamicFlags) =>
  '_f' in element ? (element._f! |= f) : (element._f = f);

export const markFlag = (el: HostElement, flag: DynamicFlags) => {
  if (isNoBlock()) {
    runMarkFlag(el, flag);
    while ((el = el._pn as any)) {
      runMarkFlag(el, DynamicFlags.CHILDREN);
    }
  }
};
