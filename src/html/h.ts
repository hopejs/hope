import { watch } from '@/activity';
import {
  createElement,
  createFragment,
  insert,
  setElementText,
  setProp,
} from '@/renderer';
import { StyleValue } from '@/renderer/setStyle';
import { forEachObj, isFunction, isString } from '@/utils';

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
      | (() => void)
      | Record<string, any | (() => any)>,
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

const setActivityText = (el: Element, text: () => string) => {
  watch(text, (v) => {
    setElementText(el, v);
  });
};

export const h: H = new Proxy(Object.create(null), {
  get: (_: any, tagName: TagNames) => {
    return (props?: any, children?: (() => any) | string) => {
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
        // If the returned value is a string,
        // it is considered to be rendering a string in response
        if (isString((children as any)?.())) {
          setActivityText(el, children as () => string);
        }
        currentContainer = container;
        currentElement = el;
      }
    };
  },
});

export const getCurrentElement = () => currentElement;
export const getCurrentContainer = /*#__PURE__*/ () => currentContainer;
export const getFragment = () => fragment || (fragment = createFragment());

function shouldAsSVG(tagName: TagNames) {
  if (tagName === 'svg') return true;
  let el = getCurrentElement();
  // If it is blank, it indicates that it is currently the first element of the whole page.
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
