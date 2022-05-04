import {
  DynamicFlags,
  HostElement,
  isNoBlock,
  markFlag,
} from '@/html/makeRenderTree';
import { isFunction, isOn, isString, parseEventName } from '@/utils';
import { setAttr } from './setAttr';
import { setClass } from './setClass';
import { setDomProp } from './setDomProp';
import { setEvent } from './setEvent';
import { setStyle } from './setStyle';

const nativeOnRE = /^on[a-z]/,
  store = Object.create(null);

export function setProp(
  el: HostElement,
  key: string,
  value: any,
  isSVG?: boolean,
  flag?: DynamicFlags
) {
  let storeKey,
    collectFlag = isNoBlock(),
    hasFlag = !collectFlag && !!flag;
  switch (key) {
    case 'class':
      hasFlag
        ? flag! & DynamicFlags.CLASS && setClass(el, value, isSVG)
        : setClass(el, value, isSVG, collectFlag);
      break;
    case 'style':
      hasFlag
        ? flag! & DynamicFlags.STYLE && setStyle(el, value)
        : setStyle(el, value, collectFlag);
      break;
    default:
      if (store[key] || isOn(key)) {
        collectFlag && markFlag(el, DynamicFlags.EVENT);
        setEvent(
          el,
          key in store ? store[key] : (store[key] = parseEventName(key)),
          value
        );
      } else if (
        (storeKey = el.tagName + key + typeof value + isSVG) in store
          ? store[storeKey]
          : (store[storeKey] = shouldSetAsProp(el, key, value, isSVG))
      ) {
        hasFlag
          ? flag! & DynamicFlags.PROP && setDomProp(el, key, value)
          : setDomProp(el, key, value, collectFlag);
      } else {
        hasFlag
          ? flag! & DynamicFlags.ATTR && setAttr(el, key, value, isSVG)
          : setAttr(el, key, value, isSVG, collectFlag);
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
