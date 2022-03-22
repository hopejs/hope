import { getCurrentElement } from '@/core';
import { forEachObj, isFunction, normalizeStyle } from '@/shared';
import { autoUpdate } from '../autoUpdate';

export type CSSStyle = {
  [P in keyof CSSStyleDeclaration]?:
    | CSSStyleDeclaration[P]
    | (() => CSSStyleDeclaration[P]);
};
export type CSSStyleValue = CSSStyle | CSSStyle[];

export function setStyle(value: CSSStyleValue | (() => CSSStyleValue)): void;
export function setStyle(value: any) {
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
