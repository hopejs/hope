import { getCurrentScope } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { getRoot, HostElement } from '@/html/makeRenderTree';

const getEventType = (type: string) => `$on_${type}`;

const commonListener: EventListener = (e) => {
  const type = getEventType(e.type),
    target = e.target as HostElement;

  //@ts-ignore
  target[type] && target[type](e);
  refresh(target._st!);
};

const initRootEventBy = (type: string) => {
    getRoot()!.addEventListener(type, commonListener);
  },
  cache = Object.create(null);

export const addCutomEventListener = (
  el: HostElement,
  type: string,
  listener: EventListener
) => {
  type in cache || initRootEventBy(type), (cache[type] = true);
  //@ts-ignore
  el[getEventType(type)] = listener;
  el._st = getCurrentScope();
};
