import { addEventListener } from '@/renderer';
import { getComponentOn, getCurrentElement } from '@/core';
import { isArray, isFunction, once } from '@/shared';
import { refresh } from '@/core/scheduler';

type Modifier = 'capture' | 'once' | 'passive' | string;

export function setEvent<K extends keyof ElementEventMap>(
  eventName: K,
  listener: (this: Element, ev: ElementEventMap[K]) => any
): void;
export function setEvent<K extends keyof ElementEventMap>(
  eventName: K,
  modifier: Modifier[] | Modifier,
  listener: (this: Element, ev: ElementEventMap[K]) => any
): void;
export function setEvent(
  eventName: string,
  listener: EventListenerOrEventListenerObject | ((...arg: any[]) => void)
): void;
export function setEvent(
  eventName: string,
  modifier: Modifier[] | Modifier,
  listener: EventListenerOrEventListenerObject | ((...arg: any[]) => void)
): void;
export function setEvent(eventName: string, modifier: any, listener?: any) {
  if (getComponentOn()) {
    return processComponentOn(eventName, modifier, listener);
  }

  const currentElement = getCurrentElement();
  if (isFunction(modifier)) {
    addEventListener(currentElement!, eventName, withRefresh(modifier));
  } else {
    addEventListener(
      currentElement!,
      eventName,
      withRefresh(listener),
      normalizeOptions(modifier)
    );
  }
}

function normalizeOptions(
  modifier: Modifier[] | Modifier
): boolean | AddEventListenerOptions | undefined {
  let result: any = {};
  let arr;
  if (isArray(modifier)) {
    arr = modifier;
  } else {
    arr = modifier
      .split(' ')
      .map((v) => v.trim())
      .filter((v) => v);
  }

  if (arr.length === 0) return;

  for (let i = 0; i < arr.length; i++) {
    const k = arr[i];
    if (k === 'capture') {
      return true;
    } else {
      result[k] = true;
    }
  }

  return result;
}

function processComponentOn(eventName: string, modifier: any, listener?: any) {
  const componentOn = getComponentOn();

  if (isFunction(modifier)) {
    componentOn![eventName] = withRefresh(modifier);
  } else {
    modifier = normalizeOptions(modifier);
    if (modifier?.once) {
      componentOn![eventName] = once(withRefresh(listener));
    } else {
      componentOn![eventName] = withRefresh(listener);
    }
  }
}

function withRefresh(listener: (...params: any[]) => void) {
  return (...params: any[]) => {
    listener(...params);
    refresh();
  };
}
