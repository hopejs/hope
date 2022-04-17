export interface RenderTree {
  /** currentElement */
  ce: Element | null;
  /** currentContainer */
  cc: Element | null;
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

export const makeRenderTree = (block: () => void) => {
  initRender();
  block();
  closeRender();
};

export const getCurrentRenderTree = () => currentRenderTree;
export const addMountedHander = (handler: () => void) =>
  currentRenderTree &&
  (currentRenderTree.om || (currentRenderTree.om = [])).push(handler);

const initRender = () => {
  const parent = currentRenderTree;
  currentRenderTree = Object.create(null) as RenderTree;
  currentRenderTree.ce = null;
  currentRenderTree.cc = null;
  currentRenderTree.f = null;
  if (parent) {
    (parent.c || (parent.c = [])).push(currentRenderTree);
    currentRenderTree.p = parent;
  }
};

const closeRender = () => {
  currentRenderTree = currentRenderTree?.p || null;
};