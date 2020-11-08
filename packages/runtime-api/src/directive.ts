import { effect } from "@hopejs/reactivity";
import { setAttribute } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction, logWarn } from "@hopejs/shared";

function outsideWarn(keyword: string) {
  logWarn(`${keyword} 指令应该使用在标签函数内部。`);
}

export function hAttr(name: string, value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => {
        setAttribute(currentElement, name, value());
      });
    } else {
      setAttribute(currentElement, name, value);
    }
  } else {
    outsideWarn("hAttr");
  }
}

export function hProp<K extends keyof HTMLElementTagNameMap>(
  key: keyof HTMLElementTagNameMap[K],
  value: unknown | (() => unknown)
): void;
export function hProp<K extends keyof SVGElementTagNameMap>(
  key: keyof SVGElementTagNameMap[K],
  value: unknown | (() => unknown)
): void;
export function hProp(key: any, value: unknown | (() => unknown)) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => (currentElement as any)[key] = value());
    } else {
      (currentElement as any)[key] = value;
    }
  } else {
    outsideWarn("hProp");
  }
}
