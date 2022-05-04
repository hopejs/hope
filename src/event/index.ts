import { getRoot } from '@/html/makeRenderTree';

const commonListener: EventListener = (e) => {
  const type = `_${e.type}`,
    target = e.target!;

  //@ts-ignore
  target[type] && target[type]();
};

export const initRootEventBy = (type: string) => {
  const root = getRoot() as any,
    storeKey = `__${type}`;

  storeKey in root ||
    (root.addEventListener(type, commonListener), (root[storeKey] = true));
};
