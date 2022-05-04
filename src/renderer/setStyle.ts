import { watch } from '@/activity/watch';
import { DynamicFlags, HostElement, markFlag } from '@/html/makeRenderTree';
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

export function setStyle(
  el: HostElement,
  value: StyleValue,
  collectFlag?: boolean
) {
  const style = (el as HTMLElement).style;

  isFunction(value)
    ? (collectFlag && markFlag(el, DynamicFlags.STYLE),
      watch(value, (v) => {
        setStyleCommon(el, style, v, true, collectFlag);
      }))
    : setStyleCommon(el, style, value, false, collectFlag);
}

function setStyleCommon(
  el: HostElement,
  style: CSSStyleDeclaration,
  value: string | CSSStyleDeclarationWithFn,
  showError?: boolean,
  collectFlag?: boolean
) {
  if (isString(value)) {
    return style.cssText !== value && (style.cssText = value);
  }
  forEachObj(
    value,
    (v, key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>) => {
      setStyleByObject(el, style, key, v, showError, collectFlag);
    }
  );
}

function setStyleByObject(
  el: HostElement,
  style: CSSStyleDeclaration,
  key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>,
  value: any,
  showError?: boolean,
  collectFlag?: boolean
) {
  isFunction(value)
    ? showError
      ? __DEV__ && error(`Nested functions are not allowed.`)
      : (collectFlag && markFlag(el, DynamicFlags.STYLE),
        watch(value, (v: any) => {
          style[key] = v;
        }))
    : (style[key] = value);
}
