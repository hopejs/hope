import { watch } from '@/activity';
import { getNextCloneNode } from '@/api/hFor';
import {
  getCurrentBlock,
  internalInsert,
  pushNodeToCurrentBlock,
} from '@/lifecycle/makeBlockTree';
import { error } from '@/log';
import { createElement, setElementText, setProp } from '@/renderer';
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

  let text: string,
    childrenResult,
    el: HostElement,
    currentCloneKey: 'firstChild' | 'nextSibling' | number;
  const _tagName = tagName,
    _isSvg = isSvg,
    isFoTag = _tagName === 'foreignObject',
    isSvgTag = _tagName === 'svg',
    container = getCurrentContainer(),
    currentBlock = getCurrentBlock(),
    clonedElement =
      currentBlock &&
      currentBlock.cns &&
      (currentBlock.cn = getNextCloneNode(
        currentBlock,
        (currentCloneKey = currentBlock.ncnk!)
      ));

  isSvgTag ? isSvg++ : isFoTag && (isSvg = 0);
  el =
    (clonedElement as HostElement) ||
    createElement(tagName as any, isSvg > 0 || isFoTag);

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
    ? setElementText(el, text)
    : (setCurrentContainer(el),
      currentBlock && (currentBlock.ncnk = 'firstChild'),
      // If the returned value is a string,
      // it is considered to be rendering a string in response
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
      setCurrentElement(el));

  (clonedElement && (currentBlock.cn = clonedElement)) ||
    internalInsert(el, container!),
    currentBlock &&
      (typeof currentCloneKey! !== 'number'
        ? (currentBlock.ncnk = 'nextSibling')
        : (currentBlock.ncnk = currentCloneKey + 1)) &&
      currentBlock.ct === container &&
      pushNodeToCurrentBlock(el);

  isSvgTag ? isSvg-- : isFoTag && (isSvg = _isSvg);
};
export const h: H = new Proxy(Object.create(null), {
  get: (_: any, _tagName: TagNames) => {
    tagName = _tagName;
    return handleTag;
  },
});

const processProps = (el: HostElement, props: any) => {
  forEachObj(props, (value, key) => {
    setProp(el, key as string, value);
  });
};
