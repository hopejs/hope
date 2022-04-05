import {
  createElement,
  createFragment,
  insert,
  setElementText,
  setProp,
} from '@/renderer';
import { forEachObj, isFunction, isString } from '@/utils';

type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};
type AllTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap;
type TagNames = keyof AllTagNameMap;
type H = {
  [tag in TagNames]: (
    props?:
      | PartialDeep<{ class: string; style: string } | AllTagNameMap[tag]>
      | string
      | (() => void),
    children?: (() => void) | string
  ) => void;
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
  get: (_: any, tagName: TagNames) => {
    return (props?: any, children?: (() => void) | string) => {
      let text: string;
      currentElement = createElement(
        tagName as any,
        shouldAsSVG(tagName as any)
      );
      if (isFunction(props)) {
        children = props;
        props = void 0;
      } else if (isString(props)) {
        text = props;
        children = props = void 0;
      } else if (isString(children)) {
        text = children;
        children = void 0;
      }
      props && processProps(currentElement, props);
      if (text!) {
        setElementText(currentElement, text);
        insert(currentElement, currentContainer || getFragment());
      } else {
        insert(currentElement, currentContainer || getFragment());
        const container = currentContainer;
        const el = currentElement;
        currentContainer = currentElement;
        (children as any)?.();
        currentContainer = container;
        currentElement = el;
      }
    };
  },
});

export const getCurrentElement = () => currentElement;
export const getCurrentContainer = () => currentContainer;
export const getFragment = () => fragment || (fragment = createFragment());

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
