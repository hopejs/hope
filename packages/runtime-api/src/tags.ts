import { setAttribute, setAttributeNS } from '@hopejs/renderer';
import {
  start,
  end,
  addScopeId,
  getCurrentElement,
} from '@hopejs/runtime-core';
import {
  forEachObj,
  isFunction,
  isString,
  isOn,
  isSVGElement,
  parseEventName,
  logError,
  NS,
} from '@hopejs/shared';
import { autoUpdate } from './autoUpdate';
import { Attrs } from './directives/hAttr';
import { hClass } from './directives/hClass';
import { hOn } from './directives/hOn';
import { Props } from './directives/hProp';
import { hStyle } from './directives/hStyle';

type TagName = keyof (HTMLElementTagNameMap & SVGElementTagNameMap);

type AttrsOrProps<
  K extends keyof (HTMLElementTagNameMap & SVGElementTagNameMap)
> = Attrs & Props<(HTMLElementTagNameMap & SVGElementTagNameMap)[K]>;

export const [div, $div] = makeTag('div');
export const [span, $span] = makeTag('span');

function makeTag<T extends TagName>(
  tagName: T
): [(attrsOrProps?: AttrsOrProps<T>) => void, () => void] {
  return [
    (attrsOrProps?: AttrsOrProps<T>) => {
      start(tagName);
      attrsOrProps && processAttrsOrProps<T>(attrsOrProps);
      addScopeId();
    },
    end,
  ];
}

function processAttrsOrProps<T extends TagName>(attrsOrProps: AttrsOrProps<T>) {
  forEachObj<any, T>(attrsOrProps, (value, key) => {
    switch (key) {
      case 'class':
        processClass(value);
        break;
      case 'style':
        processStyle(value);
        break;
      default:
        if (isOn(key)) {
          processEvent(value, parseEventName(key));
        } else {
          prosessAttrOrProp(value, key);
        }
        break;
    }
  });
}

function processClass(value: any | (() => any)) {
  hClass(value);
}

function processStyle(value: any | (() => any)) {
  hStyle(value);
}

function processEvent(
  listener: any,
  eventName: { name: string; modifier: string[] }
) {
  hOn(eventName.name, eventName.modifier, listener);
}

function prosessAttrOrProp(value: any, key: string) {
  const el = getCurrentElement() as any;
  if (shouldSetAsProp(el, key, isFunction(value) ? value() : value)) {
    autoUpdate(() =>
      prosessProps(el, isFunction(value) ? value() : value, key)
    );
  } else {
    autoUpdate(() =>
      prosessAtrrs(el, isFunction(value) ? value() : value, key)
    );
  }
}

function prosessAtrrs(el: any, value: any, key: string) {
  if (isSVGElement(el) && key.startsWith('xlink:')) {
    setAttributeNS(el, NS.XLINK, key, value);
  } else {
    setAttribute(el, key, value);
  }
}

function prosessProps(el: any, value: any, key: string) {
  if (key === 'innerHTML' || key === 'textContent') {
    // TODO: stop 子元素的 effect

    el[key] = value == null ? '' : value;
    return;
  }
  if (key === 'value' && el.tagName !== 'PROGRESS') {
    const newValue = value == null ? '' : value;
    if (el[key] !== newValue) {
      el[key] = newValue;
    }
    return;
  }
  if (value == null) {
    if (typeof el[key] === 'string') {
      el[key] = '';
      // 没有值就是删除
      setAttribute(el, key);
      return;
    }
    if (typeof el[key] === 'number') {
      el[key] = 0;
      setAttribute(el, key);
      return;
    }
  }

  // some properties perform value validation and throw
  try {
    el[key] = value;
  } catch (e) {
    if (__DEV__) {
      logError(
        `Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: ` +
          `value ${value} is invalid.`
      );
    }
  }
}

// from https://github.com/vuejs/vue-next/blob/07559e5dd7e392c415d098f75ab4dee03065302e/packages/runtime-dom/src/patchProp.ts#L67
function shouldSetAsProp(el: Element, key: string, value: unknown) {
  const nativeOnRE = /^on[a-z]/;

  if (isSVGElement(el)) {
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

  // #1787 form as an attribute must be a string, while it accepts an Element as
  // a prop
  if (key === 'form' && typeof value === 'string') {
    return false;
  }

  // #1526 <input list> must be set as attribute
  if (key === 'list' && el.tagName === 'INPUT') {
    return false;
  }

  // native onclick with string value, must be set as attribute
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }

  return key in el;
}
