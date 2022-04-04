export function setClass(el: Element, value: string, isSVG?: boolean) {
  if (isSVG) {
    el.setAttribute('class', value);
  } else {
    el.className = value;
  }
}
