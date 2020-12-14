import {
  start,
  end,
  addScopeId,
  getCurrentElement,
} from '@hopejs/runtime-core';
import { forEachObj, isFunction, isOn, parseEventName } from '@hopejs/shared';
import { autoUpdate } from './autoUpdate';
import { setAtrrs, Attrs } from './props-and-attrs/attrs';
import { setClass } from './props-and-attrs/class';
import { setEvent } from './props-and-attrs/event';
import { Props, setProps, shouldSetAsProp } from './props-and-attrs/props';
import { setStyle } from './props-and-attrs/style';

type TagName = keyof (HTMLElementTagNameMap & SVGElementTagNameMap);

type AttrsOrProps<
  K extends keyof (HTMLElementTagNameMap & SVGElementTagNameMap)
> = Attrs | Props<(HTMLElementTagNameMap & SVGElementTagNameMap)[K]>;

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
  setClass(value);
}

function processStyle(value: any | (() => any)) {
  setStyle(value);
}

function processEvent(
  listener: any,
  eventName: { name: string; modifier: string[] }
) {
  setEvent(eventName.name, eventName.modifier, listener);
}

function prosessAttrOrProp(value: any, key: string) {
  const el = getCurrentElement() as any;
  if (shouldSetAsProp(el, key, isFunction(value) ? value() : value)) {
    if (isFunction(value)) {
      autoUpdate(() => prosessProps(el, value(), key));
    } else {
      prosessProps(el, value, key);
    }
  } else {
    if (isFunction(value)) {
      autoUpdate(() => prosessAtrrs(el, value(), key));
    } else {
      prosessAtrrs(el, value, key);
    }
  }
}

function prosessAtrrs(el: any, value: any, key: string) {
  setAtrrs(el, value, key);
}

// from vue3
function prosessProps(el: any, value: any, key: string) {
  setProps(el, value, key);
}
