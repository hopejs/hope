import { watch } from '@/activity/watch';
import { error } from '@/log';
import { forEachObj, isFunction, isString } from '@/utils';

type CSSStyleDeclarationWithFn = {
  [key in keyof CSSStyleDeclaration]:
    | CSSStyleDeclaration[key]
    | (() => CSSStyleDeclaration[key]);
};

export type StyleValue =
  | string
  | CSSStyleDeclarationWithFn
  | (() => string | CSSStyleDeclarationWithFn);

export function setStyle(el: Element, value: StyleValue) {
  const style = (el as HTMLElement).style;
  if (isFunction(value)) {
    return watch(value, (v) => {
      setStyleCommon(style, v, true);
    });
  }
  setStyleCommon(style, value);
}

function setStyleCommon(
  style: CSSStyleDeclaration,
  value: string | CSSStyleDeclarationWithFn,
  showError?: boolean
) {
  if (isString(value)) {
    return (style.cssText = value);
  }
  forEachObj(
    value,
    (v, key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>) => {
      setStyleByObject(style, key, v, showError);
    }
  );
}

function setStyleByObject(
  style: CSSStyleDeclaration,
  key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>,
  value: any,
  showError?: boolean
) {
  if (isFunction(value)) {
    showError
      ? __DEV__ && error(`Nested functions are not allowed.`)
      : watch(value, (v: any) => {
          style[key] = v;
        });
  } else {
    style[key] = value;
  }
}
