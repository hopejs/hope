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

export function setStyle(el: HostElement, value: StyleValue) {
  const style = (el as HTMLElement).style;

  isFunction(value)
    ? (markFlag(el, DynamicFlags.STYLE),
      watch(value, (v) => {
        setStyleCommon(el, style, v, true);
      }))
    : setStyleCommon(el, style, value);
}

function setStyleCommon(
  el: HostElement,
  style: CSSStyleDeclaration,
  value: string | CSSStyleDeclarationWithFn,
  showError?: boolean
) {
  if (isString(value)) {
    return style.cssText !== value && (style.cssText = value);
  }
  forEachObj(
    value,
    (v, key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>) => {
      setStyleByObject(el, style, key, v, showError);
    }
  );
}

function setStyleByObject(
  el: HostElement,
  style: CSSStyleDeclaration,
  key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>,
  value: any,
  showError?: boolean
) {
  if (isFunction(value)) {
    showError
      ? __DEV__ && error(`Nested functions are not allowed.`)
      : (markFlag(el, DynamicFlags.STYLE),
        watch(
          value,
          (v: any) => {
            style[key] = v;
          },
          style[key]
        ));
  } else {
    style[key] !== value && (style[key] = value);
  }
}
