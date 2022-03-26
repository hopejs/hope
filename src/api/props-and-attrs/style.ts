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
    let oldValue: any;
    autoUpdate(() => {
      const newValue = value();
      if (oldValue === newValue) return;
      oldValue = newValue;
      forEachObj(normalizeStyle(newValue)!, (v: any, key) => {
        style[key as any] = v;
      });
    });
  } else {
    forEachObj(normalizeStyle(value)!, (v: any, key) => {
      if (isFunction(v)) {
        let oldValue: any;
        autoUpdate(() => {
          const newValue = v();
          if (oldValue === newValue) return;
          style[key as any] = oldValue = newValue;
        });
      } else {
        style[key as any] = v;
      }
    });
  }
}
