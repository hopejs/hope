import { svgNS } from '@/utils';
import { setProp } from './setProp';

const insert = (
  child: Node,
  parent: Element | DocumentFragment,
  anchor?: Node
) => {
  parent.insertBefore(child, anchor || null);
};

const createFragment = () => document.createDocumentFragment();

function createElement(tag: string, isSVG: true): SVGAElement;
function createElement(tag: string, isSVG: false): HTMLElement;
function createElement(tag: string, isSVG: boolean): SVGAElement | HTMLElement;
function createElement(
  tag: string,
  isSVG: boolean,
  isCustomizedBuiltIn?: string
) {
  return isSVG
    ? document.createElementNS(svgNS, tag)
    : document.createElement(
        tag,
        isCustomizedBuiltIn ? { is: isCustomizedBuiltIn } : undefined
      );
}

const createText = (text: string) => document.createTextNode(text);

const createComment = (text: string) => document.createComment(text);

const setText = (node: Node, text: string) => {
  node.nodeValue = text;
};

const setElementText = (el: Element, text: string) => {
  el.textContent = text;
};

const parentNode = (node: Node) => node.parentNode;

const nextSibling = (node: Node) => node.nextSibling;

const cloneNode = (node: Node) => {
  return node.cloneNode(true);
};

export {
  setProp,
  insert,
  createFragment,
  createElement,
  createText,
  createComment,
  setText,
  setElementText,
  parentNode,
  nextSibling,
  cloneNode,
};
