import { watch } from '@/activity';
import { error } from '@/log';
import {
  createElement,
  createFragment,
  insert,
  setElementText,
  setProp,
} from '@/renderer';
import { StyleValue } from '@/renderer/setStyle';
import { forEachObj, isFunction, isNumber, isString } from '@/utils';
import { getCurrentRenderTree, RenderTree } from './makeRender';

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

const setActivityText = (el: Element, text: () => string | number) => {
  watch(text, (v) => {
    setElementText(el, String(v));
  });
};

export const h: H = new Proxy(Object.create(null), {
  get: (_: any, tagName: TagNames) => {
    return (props?: any, children?: (() => any) | string) => {
      if (__DEV__ && getCurrentRenderTree() === null) {
        return error(
          `Must be passed to the render function as a component for rendering.`
        );
      }

      let text: string;
      const currentElement = createElement(
        tagName as any,
        shouldAsSVG(tagName as any)
      );
      setCurrentElement(currentElement);
      if (isFunction(props)) {
        children = props;
        props = void 0;
      } else if (isString(props) || isNumber(props)) {
        text = String(props);
        children = props = void 0;
      } else if (isString(children) || isNumber(children)) {
        text = String(children);
        children = void 0;
      }
      props && processProps(currentElement, props);
      if (text!) {
        setElementText(currentElement, text);
        insert(currentElement, getCurrentContainer()!);
      } else {
        insert(currentElement, getCurrentContainer()!);
        const container = getCurrentContainer();
        const el = currentElement;
        setCurrentContainer(currentElement);
        // If the returned value is a string,
        // it is considered to be rendering a string in response
        const childrenResult = (children as any)?.();
        if (isString(childrenResult) || isNumber(childrenResult)) {
          setActivityText(el, children as () => string | number);
        }
        setCurrentContainer(container);
        setCurrentElement(el);
      }
    };
  },
});

const setCurrentRenderTreeWithKey = (key: keyof RenderTree, value: any) => {
  const renderTree = getCurrentRenderTree();
  if (renderTree) {
    renderTree[key] = value;
  }
};
const setCurrentElement = (el: Element | DocumentFragment | null) => {
  setCurrentRenderTreeWithKey('ce', el);
};
const setCurrentContainer = (el: Element | DocumentFragment | null) => {
  setCurrentRenderTreeWithKey('cc', el);
};

export const getCurrentElement = () => getCurrentRenderTree()?.ce || null;
export const getCurrentContainer = /*#__PURE__*/ () => {
  const renderTree = getCurrentRenderTree();
  if (renderTree === null) return null;
  return renderTree.cc || renderTree.f || (renderTree.f = createFragment());
};
export const getFragment = () => {
  const renderTree = getCurrentRenderTree();
  if (renderTree === null) return null;
  return renderTree.f || (renderTree.f = createFragment());
};

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
