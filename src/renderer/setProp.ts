import { HostElement } from '@/html/makeRenderTree';
import { isFunction, isOn, isString, parseEventName } from '@/utils';
import { setAttr } from './setAttr';
import { setClass } from './setClass';
import { setDomProp } from './setDomProp';
import { setEvent } from './setEvent';
import { setStyle } from './setStyle';

const nativeOnRE = /^on[a-z]/;

export function setProp(
  el: HostElement,
  key: string,
  value: any,
  isSVG?: boolean
) {
  switch (key) {
    case 'class':
      setClass(el, value, isSVG);
      break;
    case 'style':
      setStyle(el, value);
      break;
    default:
      if (isOn(key)) {
        setEvent(el, parseEventName(key), value);
      } else if (shouldSetAsProp(el, key, value, isSVG)) {
        setDomProp(el, key, value);
      } else {
        setAttr(el, key, value, isSVG);
      }
      break;
  }
}

/**
 * from vue3
 * @param el
 * @param key
 * @param value
 * @param isSVG
 * @returns
 */
function shouldSetAsProp(
  el: Element,
  key: string,
  value: unknown,
  isSVG?: boolean
) {
  if (isSVG) {
    // most keys must be set as attribute on svg elements to work
    // ...except innerHTML
    if (key === 'innerHTML') {
      return true;
    }
    // or native onclick with function values
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }

  // spellcheck and draggable are numerated attrs, however their
  // corresponding DOM properties are actually booleans - this leads to
  // setting it with a string "false" value leading it to be coerced to
  // `true`, so we need to always treat them as attributes.
  // Note that `contentEditable` doesn't have this problem: its DOM
  // property is also enumerated string values.
  if (key === 'spellcheck' || key === 'draggable') {
    return false;
  }

  // #1787, #2840 form property on form elements is readonly and must be set as
  // attribute.
  if (key === 'form') {
    return false;
  }

  // #1526 <input list> must be set as attribute
  if (key === 'list' && el.tagName === 'INPUT') {
    return false;
  }

  // #2766 <textarea type> must be set as attribute
  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false;
  }

  // native onclick with string value, must be set as attribute
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }

  return key in el;
}
