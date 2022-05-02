import { watch } from '@/activity/watch';
import { HostElement } from '@/html/makeRenderTree';
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
    ? watch(value, (v) => {
        setStyleCommon(style, v, true);
      })
    : setStyleCommon(style, value);
}

function setStyleCommon(
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
  isFunction(value)
    ? showError
      ? __DEV__ && error(`Nested functions are not allowed.`)
      : watch(
          value,
          (v: any) => {
            style[key] = v;
          },
          style[key]
        )
    : style[key] !== value && (style[key] = value);
}
