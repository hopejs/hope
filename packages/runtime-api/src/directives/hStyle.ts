import { setAttribute } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction, normalizeStyle, stringifyStyle } from '@hopejs/shared';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';

type CSSStyle<T = CSSStyleDeclaration> = {
  [P in keyof T]?: any;
};
type CSSStyleValue = CSSStyle | CSSStyle[];

export function hStyle(value: CSSStyleValue | (() => CSSStyleValue)): void;
export function hStyle(value: any) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hStyle');

  if (isFunction(value)) {
    autoUpdate(() =>
      setAttribute(
        currentElement!,
        'style',
        stringifyStyle(normalizeStyle(value()))
      )
    );
  } else {
    setAttribute(
      currentElement!,
      'style',
      stringifyStyle(normalizeStyle(value))
    );
  }
}
