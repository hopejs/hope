import { forEachObj, isString } from '@/utils';

export function setStyle(el: Element, value: string | CSSStyleDeclaration) {
  const style = (el as HTMLElement).style;
  if (isString(value)) {
    return (style.cssText = value);
  }
  forEachObj(
    value,
    (v, key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>) => {
      setStyleByObject(style, key, v);
    }
  );
}

function setStyleByObject(
  style: CSSStyleDeclaration,
  key: keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>,
  value: any
) {
  style[key] = value;
}
