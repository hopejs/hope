import { addEventListener } from '@hopejs/renderer';
import { getComponentOn, getCurrentElement } from '@hopejs/runtime-core';
import { isFunction, once } from '@hopejs/shared';
import { outsideError } from './outsideError';

type Modifier = 'capture' | 'once' | 'passive' | string;

export function hOn<K extends keyof ElementEventMap>(
  type: K,
  listener: (this: Element, ev: ElementEventMap[K]) => any
): void;
export function hOn<K extends keyof ElementEventMap>(
  type: K,
  modifier: Modifier,
  listener: (this: Element, ev: ElementEventMap[K]) => any
): void;
export function hOn(
  type: string,
  listener: EventListenerOrEventListenerObject | ((...arg: any[]) => void)
): void;
export function hOn(
  type: string,
  modifier: Modifier,
  listener: EventListenerOrEventListenerObject | ((...arg: any[]) => void)
): void;
export function hOn(type: string, modifier: any, listener?: any) {
  if (getComponentOn()) {
    return processComponentOn(type, modifier, listener);
  }

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hOn');

  if (isFunction(modifier)) {
    addEventListener(currentElement!, type, modifier);
  } else {
    addEventListener(
      currentElement!,
      type,
      listener,
      normalizeOptions(modifier)
    );
  }
}

function normalizeOptions(
  modifier: Modifier
): boolean | AddEventListenerOptions {
  let result: any = {};
  const arr = modifier
    .split(' ')
    .map((v) => v.trim())
    .filter((v) => v);

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

function processComponentOn(type: string, modifier: any, listener?: any) {
  const componentOn = getComponentOn();

  if (isFunction(modifier)) {
    componentOn![type] = modifier;
  } else {
    modifier = normalizeOptions(modifier);
    if (modifier.once) {
      componentOn![type] = once(listener);
    } else {
      componentOn![type] = listener;
    }
  }
}
