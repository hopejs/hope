import { withRefresh } from '@/activity/refresh';
import { addCutomEventListener } from '@/event';
import { HostElement } from '@/html/makeRenderTree';
import { error } from '@/log';
import { isFunction } from '@/utils';

export function setEvent(
  el: HostElement,
  type: string,
  handler: EventListener
) {
  if (isFunction(handler)) {
    addCutomEventListener(el, type, withRefresh(handler));
  } else if (__DEV__) {
    error(`Event listener must be a function.`);
  }
}
