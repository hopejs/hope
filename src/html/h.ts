import { createElement, createFragment, insert, setProp } from '@/renderer';
import { forEachObj, isFunction } from '@/utils';

type TagNames = keyof (HTMLElementTagNameMap & SVGElementTagNameMap);
type H = {
  [key in TagNames]: (props?: any) => void;
};

let currentElement: Element | null = null;
let currentContainer: Element | null = null;
let fragment: DocumentFragment | null = null;

/**
 * for test
 */
export const init = /*#__PURE__*/ () => {
  currentElement = null;
  currentContainer = null;
  fragment = null;
};

export const h: H = new Proxy(Object.create(null), {
  get: (_, tagName: TagNames) => {
    return (props?: any, children?: () => any) => {
      currentElement = createElement(tagName, shouldAsSVG(tagName));
      if (isFunction(props)) {
        children = props;
        props = null;
      }
      props && processProps(currentElement, props);
      insert(
        currentElement,
        currentContainer || fragment || (fragment = createFragment())
      );
      const container = currentContainer;
      const el = currentElement;
      currentContainer = currentElement;
      children?.();
      currentContainer = container;
      currentElement = el;
    };
  },
});

export const getCurrentElement = () => currentElement;
export const getCurrentContainer = () => currentContainer;
export const getFragment = () => fragment;

function shouldAsSVG(tagName: TagNames) {
  if (tagName === 'svg') return true;
  let el = getCurrentElement();
  // 如果为空则说明当前是整个页面的第一个元素。
  if (el == null) return false;

  do {
    if (el!.tagName === 'foreignObject') return false;
    if (el!.tagName === 'svg') return true;
    el = el!.parentElement;
  } while (el?.parentElement);

  return false;
}

function processProps(el: Element, props: any) {
  forEachObj(props, (value, key) => {
    setProp(el, key as string, value);
  });
}
