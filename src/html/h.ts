import { watch } from '@/activity';
import { getCurrentBlock } from '@/lifecycle/makeBlockTree';
import { error } from '@/log';
import {
  createElement,
  createFragment,
  insert,
  setElementText,
  setProp,
} from '@/renderer';
import { StyleValue } from '@/renderer/setStyle';
import { forEachObj } from '@/utils';
import { getCurrentRender, RenderTree } from './makeRenderTree';

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

let tagName = '';
let isSvg = 0;
const handleTag = (props?: any, children?: (() => any) | string) => {
  if (__DEV__ && getCurrentRender() === null) {
    return error(
      `Must be passed to the render function as a component for rendering.`
    );
  }

  let text: string, currentElement: HTMLElement | SVGAElement;
  const _tagName = tagName,
    _isSvg = isSvg,
    isFoTag = _tagName === 'foreignObject',
    isSvgTag = _tagName === 'svg',
    container = getCurrentContainer();

  isSvgTag ? isSvg++ : isFoTag && (isSvg = 0);
  currentElement = createElement(tagName as any, isSvg > 0 || isFoTag);

  setCurrentElement(currentElement);
  if (typeof props === 'function') {
    children = props;
    props = void 0;
  } else if (typeof props === 'string' || typeof props === 'number') {
    text = props as string;
    children = props = void 0;
  } else if (typeof children === 'string' || typeof children === 'number') {
    text = children as string;
    children = void 0;
  }
  props && processProps(currentElement, props);
  if (text!) {
    setElementText(currentElement, text);
    _insert(currentElement, container!);
  } else {
    const el = currentElement;
    setCurrentContainer(el);
    // If the returned value is a string,
    // it is considered to be rendering a string in response
    const childrenResult = (children as any)?.();
    if (
      typeof childrenResult === 'string' ||
      typeof childrenResult === 'number'
    ) {
      watch(children as () => string | number, (v) => {
        setElementText(el, v as string);
      });
    }
    setCurrentContainer(container);
    setCurrentElement(el);
    _insert(el, container!);
  }

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
  if (block?.container === container) {
    insert(el, container, block.end);
  } else {
    insert(el, container);
  }
};

const setCurrentRenderTreeWithKey = (key: keyof RenderTree, value: any) => {
  const renderTree = getCurrentRender();
  if (renderTree) {
    renderTree[key] = value;
  }
};
const setCurrentElement = (el: Element | DocumentFragment | null) => {
  setCurrentRenderTreeWithKey('ce', el);
};
const setCurrentContainer = (el: ParentNode | DocumentFragment | null) => {
  setCurrentRenderTreeWithKey('cc', el);
};

export const getCurrentElement = () => getCurrentRender()?.ce || null;
export const getCurrentContainer = () => {
  const renderTree = getCurrentRender();
  if (renderTree === null) return null;
  return renderTree.cc || renderTree.f || (renderTree.f = createFragment());
};
export const getFragment = () => {
  const renderTree = getCurrentRender();
  if (renderTree === null) return null;
  return renderTree.f || (renderTree.f = createFragment());
};

function processProps(el: Element, props: any) {
  forEachObj(props, (value, key) => {
    setProp(el, key as string, value);
  });
}
