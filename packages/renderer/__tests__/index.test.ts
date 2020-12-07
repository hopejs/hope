import { NS } from '@hopejs/shared';
import {
  addEventListener,
  removeEventListener,
  appendChild,
  createComment,
  createElement,
  createElementNS,
  createFragment,
  createPlaceholder,
  createTextNode,
  insertBefore,
  removeChild,
  setAttribute,
} from '../src';

describe('addEventListener', () => {
  it('basic', () => {
    const container = createElement('div');
    const fn = jest.fn();
    addEventListener(container, 'click', fn);
    expect(fn).toBeCalledTimes(0);
    container.dispatchEvent(new CustomEvent('click'));
    expect(fn).toBeCalledTimes(1);
  });
});

describe('removeEventListener', () => {
  it('basic', () => {
    const container = createElement('div');
    const fn = jest.fn();
    addEventListener(container, 'click', fn);
    expect(fn).toBeCalledTimes(0);
    container.dispatchEvent(new CustomEvent('click'));
    expect(fn).toBeCalledTimes(1);
    removeEventListener(container, 'click', fn);
    container.dispatchEvent(new CustomEvent('click'));
    expect(fn).toBeCalledTimes(1);
  });
});

describe('appendChild', () => {
  it('basic', () => {
    const container = createElement('div');
    const text = createTextNode('text');
    expect(container.childNodes.length).toBe(0);
    appendChild(container, text);
    expect(container.firstChild).toBe(text);
  });
});

describe('createComment', () => {
  it('basic', () => {
    const com = createComment('');
    expect(com.nodeName).toBe('#comment');
  });
});

describe('createElement', () => {
  it('basic', () => {
    const div = createElement('div');
    expect(div.nodeName).toBe('DIV');
  });
});

describe('createElementNS', () => {
  it('basic', () => {
    const svg = createElementNS(NS.SVG, 'svg');
    expect(svg.nodeName).toBe('svg');
    expect(svg.namespaceURI).toBe(NS.SVG);
  });
});

describe('createFragment', () => {
  it('basic', () => {
    const fragment = createFragment();
    expect(fragment.nodeName).toBe('#document-fragment');
  });
});

describe('createPlaceholder', () => {
  it('basic', () => {
    const p = createPlaceholder('placeholder');
    expect(p.nodeName).toBe('#comment');
    expect(p.data).toBe('placeholder');
  });
});

describe('createTextNode', () => {
  it('basic', () => {
    const text = createTextNode('text');
    expect(text.nodeName).toBe('#text');
    expect(text.data).toBe('text');
  });
});

describe('insertBefore', () => {
  it('basic', () => {
    const container = createElement('div');
    const text = createTextNode('text');
    const com = createComment('');
    appendChild(container, text);
    expect(container.firstChild).toBe(text);
    insertBefore(com, text);
    expect(container.firstChild).toBe(com);
  });
});

describe('removeChild', () => {
  it('basic', () => {
    const container = createElement('div');
    const text = createTextNode('text');
    appendChild(container, text);
    expect(container.firstChild).toBe(text);
    removeChild(text);
    expect(container.childNodes.length).toBe(0);
  });
});

describe('setAttribute', () => {
  it('basic', () => {
    const container = createElement('div');
    setAttribute(container, 'aaa', 'aaa');
    expect(container.outerHTML).toBe(`<div aaa="aaa"></div>`);
  });
});
