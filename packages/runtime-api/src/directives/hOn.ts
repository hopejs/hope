import { addEventListener } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { outsideWarn } from "./outsideWarn";

type Modifier = "capture" | "once" | "passive" | string;

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
  listener: EventListenerOrEventListenerObject
): void;
export function hOn(
  type: string,
  modifier: Modifier,
  listener: EventListenerOrEventListenerObject
): void;
export function hOn(type: string, modifier: any, listener?: any) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(modifier)) {
      addEventListener(currentElement, type, modifier);
    } else {
      addEventListener(
        currentElement,
        type,
        listener,
        normalizeOptions(modifier)
      );
    }
  } else {
    outsideWarn("hOn");
  }
}

function normalizeOptions(
  modifier: Modifier
): boolean | AddEventListenerOptions {
  let result: any = {};
  const arr = modifier
    .split(" ")
    .map((v) => v.trim())
    .filter((v) => v);

  for (let i = 0; i < arr.length; i++) {
    const k = arr[i];
    if (k === "capture") {
      return true;
    } else {
      result[k] = true;
    }
  }

  return result;
}
