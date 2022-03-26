interface UpdateQueue {
  /**
   * Queues that need to be updated
   */
  uq?: (() => void)[];
  /**
   * Parent
   */
  p?: UpdateQueue;
  /**
   * Childrens
   */
  c?: UpdateQueue[];
}

/**
 * Root component of app
 */
let root: UpdateQueue;

/**
 * Root component that currently needs to be updated
 */
let componentOfNeedUpdate: UpdateQueue | null = null;

let currentComponent: UpdateQueue | null = null;

export function setRoot(component: UpdateQueue) {
  root = component;
}

export function getRoot() {
  return root;
}

export function setComponentOfNeedUpdate(com: UpdateQueue) {
  componentOfNeedUpdate = com;
}

export function getComponentOfNeedUpdate() {
  return componentOfNeedUpdate;
}

export function setCurrentComponent(component: UpdateQueue) {
  currentComponent = component;
}

export function setBackToParent() {
  const current = getCurrentComponent();
  currentComponent = current?.p || null;
}

export function getCurrentComponent() {
  return currentComponent;
}

export function pushTaskToQueue(component: UpdateQueue, task: () => void) {
  (component.uq || (component.uq = [])).push(task);
}

export function pushToParent(
  parentComponent: UpdateQueue | null,
  component: UpdateQueue
) {
  if (parentComponent) {
    (parentComponent.c || (parentComponent.c = [])).push(component);
  }
}

export function startUpdate() {
  const needUpdate = getComponentOfNeedUpdate();
  if (needUpdate) {
    runTask(needUpdate);
  }
}

function runTask(component: UpdateQueue) {
  component.uq?.forEach((fn) => fn());
  component.c?.forEach(runTask);
}
