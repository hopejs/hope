import { nextTick } from "./nextTick";

export interface UpdateQueue {
  /**
   * Update lifecycle handler
   */
  ulh?: (() => void)[];
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
 * Root component that currently needs to be updated
 */
let componentOfNeedUpdate: UpdateQueue | null = null;

let currentComponent: UpdateQueue | null = null;

export function setComponentOfNeedUpdate(com: UpdateQueue | null) {
  if (!com) {
    return;
  }
  componentOfNeedUpdate = com;
}

export function getComponentOfNeedUpdate() {
  return componentOfNeedUpdate;
}

export function setCurrentComponent(component: UpdateQueue | null) {
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
    component.p = parentComponent;
    (parentComponent.c || (parentComponent.c = [])).push(component);
  }
}

/**
 * Remove from parent component
 * @param component
 */
export function removeComponent(component: UpdateQueue) {
  if (component.p?.c) {
    component.p.c = component.p.c.filter((item) => item !== component);
  }
}

/**
 * Update the status of the entire page
 */
export function refresh() {
  nextTick(startUpdate);
}

export function removeTask(currentComponent: UpdateQueue, task: () => void) {
  currentComponent.uq = currentComponent.uq?.filter((item) => item !== task);
}

function runTask(component: UpdateQueue) {
  component.uq?.forEach((fn) => fn());
  component.c?.forEach(runTask);
}

function startUpdate() {
  const needUpdate = getComponentOfNeedUpdate();
  if (needUpdate) {
    runTask(needUpdate);
  }
}
