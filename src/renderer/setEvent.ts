import { isFunction } from "@/utils";

export function setEvent(
  el: Element,
  event: string,
  handler: EventListener,
  options?: EventListenerOptions
) {
  if (isFunction(handler)) {
    el.addEventListener(event, handler, options);
  }
}