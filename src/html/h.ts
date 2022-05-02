import { watch } from '@/activity';
import {
  getCurrentBlock,
  pushNodeToCurrentBlock,
} from '@/lifecycle/makeBlockTree';
import { error } from '@/log';
import { createElement, insert, setElementText, setProp } from '@/renderer';
import { StyleValue } from '@/renderer/setStyle';
import { forEachObj } from '@/utils';
import {
  getCurrentContainer,
  getCurrentRender,
  HostElement,
  setCurrentContainer,
  setCurrentElement,
} from './makeRenderTree';

/**
 * Allows the value of an object to be a function that returns the same value
 */
type Functionalization<T> = {
  [key in keyof T]: T[key] | (() => T[key]);
};

type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};
type AllTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap;
type TagNames = keyof AllTagNameMap;
type H = {
  [tag in TagNames]: (
    props?:
      | PartialDeep<
          | { class: string | (() => string); style: StyleValue }
          | Functionalization<AllTagNameMap[tag]>
        >
      | string
      | number
      | (() => void)
      | Record<string, any | (() => any)>,
    children?: (() => void) | string | number
  ) => void;
};

let tagName = '',
  isSvg = 0;
const handleTag = (props?: any, children?: (() => any) | string) => {
  if (__DEV__ && getCurrentRender() === null) {
    return error(
      `Must be passed to the render function as a component for rendering.`
    );
  }

  let text: string, childrenResult, el: HostElement;
  const _tagName = tagName,
    _isSvg = isSvg,
    isFoTag = _tagName === 'foreignObject',
    isSvgTag = _tagName === 'svg',
    container = getCurrentContainer();

  isSvgTag ? isSvg++ : isFoTag && (isSvg = 0);
  el = createElement(tagName as any, isSvg > 0 || isFoTag);

  setCurrentElement(el);
  if (typeof props === 'function') {
    (children = props), (props = void 0);
  } else if (typeof props === 'string' || typeof props === 'number') {
    (text = props as string), (children = props = void 0);
  } else if (typeof children === 'string' || typeof children === 'number') {
    (text = children as string), (children = void 0);
  }
  props && processProps(el, props);

  text!
    ? (setElementText(el, text), _insert(el, container!)) // If the returned value is a string,
    : // it is considered to be rendering a string in response
      (setCurrentContainer(el),
      (childrenResult = (children as any)?.()),
      (typeof childrenResult === 'string' ||
        typeof childrenResult === 'number') &&
        watch(
          children as () => string | number,
          (v) => {
            setElementText(el, v as string);
          },
          el.textContent
        ),
      setCurrentContainer(container),
      setCurrentElement(el),
      _insert(el, container!));

  isSvgTag ? isSvg-- : isFoTag && (isSvg = _isSvg);
};
export const h: H = new Proxy(Object.create(null), {
  get: (_: any, _tagName: TagNames) => {
    tagName = _tagName;
    return handleTag;
  },
});

const _insert = (el: Element, container: ParentNode | DocumentFragment) => {
  const block = getCurrentBlock();
  block?.ct === container
    ? (pushNodeToCurrentBlock(el), insert(el, container, block.end))
    : insert(el, container);
};

const processProps = (el: HostElement, props: any) => {
  forEachObj(props, (value, key) => {
    setProp(el, key as string, value);
  });
};
