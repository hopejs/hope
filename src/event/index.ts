import { getRoot, HostElement } from '@/html/makeRenderTree';

const getEventType = (type: string) => `$on_${type}`;

const commonListener: EventListener = (e) => {
  const type = getEventType(e.type),
    target = e.target!;

  //@ts-ignore
  target[type] && target[type](e);
};

const initRootEventBy = (type: string) => {
  const root = getRoot() as any,
    storeKey = `__${type}`;

  storeKey in root ||
    (root.addEventListener(type, commonListener), (root[storeKey] = true));
};

export const addCutomEventListener = (
  el: HostElement,
  type: string,
  listener: EventListener
) => {
  initRootEventBy(type);
  //@ts-ignore
  el[getEventType(type)] = listener;
};
