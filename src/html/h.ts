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
  DynamicFlags,
  getCurrentContainer,
  getCurrentRender,
  HostElement,
  isNoBlock,
  markFlag,
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

let isSvg = 0;

export const h: H = new Proxy(Object.create(null), {
  get: (_: any, tagName: TagNames) => {
    return (props?: any, children?: (() => any) | string) => {
      if (__DEV__ && getCurrentRender() === null) {
        return error(
          `Must be passed to the render function as a component for rendering.`
        );
      }

      let text: string,
        childrenResult,
        el: HostElement,
        currentCloneKey: 'firstChild' | 'nextSibling' | number,
        collectFlag = false,
        isSvgEl = false;
      const _tagName = tagName,
        _isSvg = isSvg,
        isFoTag = _tagName === 'foreignObject',
        isSvgTag = _tagName === 'svg',
        container = getCurrentContainer()!,
        currentBlock = getCurrentBlock(),
        clonedElement =
          currentBlock &&
          currentBlock.cns &&
          (currentBlock.cn = getNextCloneNode(
            currentBlock,
            (currentCloneKey = currentBlock.ncnk!)
          )),
        templateElement = currentBlock && currentBlock.tn,
        isCloned = !!templateElement,
        flag = isCloned ? templateElement._f : 0;

      isSvgTag ? isSvg++ : isFoTag && (isSvg = 0);
      isSvgEl = isSvg > 0 || isFoTag;
      el =
        (clonedElement as HostElement) ||
        createElement(tagName as any, isSvgEl);

      // flag is empty, indicating that the currently cloned element is a static node
      if (isCloned && !flag) {
        return (
          (currentBlock.cn = clonedElement) &&
            (currentBlock.tn = templateElement),
          (typeof currentCloneKey! !== 'number'
            ? (currentBlock.ncnk = 'nextSibling')
            : (currentBlock.ncnk = currentCloneKey + 1)) &&
            currentBlock.ct === container &&
            pushNodeToCurrentBlock(el),
          isSvgTag ? isSvg-- : isFoTag && (isSvg = _isSvg)
        );
      }

      // For performance, the nodes are saved through private attributes
      (collectFlag = isNoBlock()) &&
        ((el._pn = container as HostElement),
        container._fc
          ? (container._lc = container._lc!._ns = el)
          : (container._fc = container._lc = el));

      setCurrentElement(el);
      if (typeof props === 'function') {
        (children = props), (props = void 0);
      } else if (typeof props === 'string' || typeof props === 'number') {
        (text = props as string), (children = props = void 0);
      } else if (typeof children === 'string' || typeof children === 'number') {
        (text = children as string), (children = void 0);
      }
      isCloned
        ? (flag! & DynamicFlags.CLASS ||
            flag! & DynamicFlags.ATTR ||
            flag! & DynamicFlags.EVENT ||
            flag! & DynamicFlags.PROP ||
            flag! & DynamicFlags.STYLE) &&
          props &&
          processProps(el, props, isSvgEl, (isCloned && flag) as any)
        : props && processProps(el, props, isSvgEl, (isCloned && flag) as any);

      text!
        ? // At this time, the text node is static and does not need to be set repeatedly
          isCloned || setElementText(el, text)
        : (isCloned && flag! & DynamicFlags.TEXT
            ? watch(children as () => string | number, (v) => {
                setElementText(el, v as string);
              })
            : setCurrentContainer(el),
          currentBlock && (currentBlock.ncnk = 'firstChild'),
          // If the returned value is a string,
          // it is considered to be rendering a string in response
          (childrenResult = (children as any)?.()),
          (typeof childrenResult === 'string' ||
            typeof childrenResult === 'number') &&
            (collectFlag && markFlag(el, DynamicFlags.TEXT),
            watch(children as () => string | number, (v) => {
              setElementText(el, v as string);
            })),
          setCurrentContainer(container),
          setCurrentElement(el));

      (clonedElement &&
        (currentBlock.cn = clonedElement) &&
        (currentBlock.tn = templateElement)) ||
        internalInsert(el, container!),
        currentBlock &&
          (typeof currentCloneKey! !== 'number'
            ? (currentBlock.ncnk = 'nextSibling')
            : (currentBlock.ncnk = currentCloneKey + 1)) &&
          currentBlock.ct === container &&
          pushNodeToCurrentBlock(el);

      isSvgTag ? isSvg-- : isFoTag && (isSvg = _isSvg);
    };
  },
});

const processProps = (
  el: HostElement,
  props: any,
  isSvg?: boolean,
  flag?: DynamicFlags
) => {
  forEachObj(props, (value, key) => {
    setProp(el, key as string, value, isSvg, flag);
  });
};
