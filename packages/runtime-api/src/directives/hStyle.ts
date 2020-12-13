import { getCurrentElement } from '@hopejs/runtime-core';
import { forEachObj, isFunction, normalizeStyle } from '@hopejs/shared';
import { autoUpdate } from '../autoUpdate';

type CSSStyle<T = CSSStyleDeclaration> = {
  [P in keyof T]?: any | (() => any);
};
type CSSStyleValue = CSSStyle | CSSStyle[];

export function hStyle(value: CSSStyleValue | (() => CSSStyleValue)): void;
export function hStyle(value: any) {
  const style = (getCurrentElement() as HTMLElement | SVGElement).style;

  if (isFunction(value)) {
    autoUpdate(() =>
      forEachObj(normalizeStyle(value())!, (v: any, key) => {
        style[key as any] = isFunction(v) ? v() : v;
      })
    );
  } else {
    forEachObj(normalizeStyle(value)!, (v: any, key) => {
      if (isFunction(v)) {
        autoUpdate(() => (style[key as any] = v()));
      } else {
        style[key as any] = v;
      }
    });
  }
}
