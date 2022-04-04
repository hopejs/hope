export const xlinkNS = 'http://www.w3.org/1999/xlink';

export function setAttr(el: Element, key: string, value: any, isSVG?: boolean) {
  if (isSVG) {
    el.setAttributeNS(xlinkNS, key, value);
  } else {
    el.setAttribute(key, value);
  }
}
