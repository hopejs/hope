import { getCurrentElement, h, render } from '@/html';
import { getCurrentContainer, getRoot } from '@/html/makeRenderTree';
import { createElement } from '@/renderer';
import { htmlNS, svgNS } from '@/utils';

describe('html', () => {
  it('div', () => {
    render(() => {
      h.div();
      expect(getCurrentElement()?.outerHTML).toBe(`<div></div>`);
      expect(getCurrentContainer()).toBe(getRoot());
      expect(getRoot()?.firstChild === getCurrentElement()).toBe(true);
    }, createElement('div', false));
  });

  it('div with text', () => {
    render(() => {
      h.div('text');
      expect(getCurrentElement()?.outerHTML).toBe(`<div>text</div>`);
      expect(getRoot()?.firstElementChild?.outerHTML).toBe(`<div>text</div>`);
    }, createElement('div', false));
  });

  it('nest Element', () => {
    render(() => {
      h.div(() => {
        const container = getCurrentContainer() as Element;
        const currentElement = getCurrentElement();
        h.span();
        expect(getCurrentElement()?.outerHTML).toBe(`<span></span>`);
        expect(container === currentElement).toBe(true);
        expect(container?.outerHTML).toBe(`<div><span></span></div>`);
      });
      expect(getCurrentElement()?.outerHTML).toBe(`<div><span></span></div>`);
      expect(getCurrentContainer()).toBe(getRoot());
      expect(getRoot()?.firstChild === getCurrentElement()).toBe(true);
    }, createElement('div', false));
  });

  it('div with class name', () => {
    render(() => {
      h.div({ class: 'class-name' });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div class="class-name"></div>`
      );
    }, createElement('div', false));
  });

  it('div with inline style', () => {
    render(() => {
      h.div({ style: 'width: 100px; height: 100px;' });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div style=\"width: 100px; height: 100px;\"></div>`
      );
    }, createElement('div', false));
  });

  it('div with object style', () => {
    render(() => {
      h.div({ style: { width: '100px', height: '100px' } });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div style=\"width: 100px; height: 100px;\"></div>`
      );
    }, createElement('div', false));
  });

  it('div with innerHTML', () => {
    render(() => {
      h.div({ innerHTML: `<span></span>` });
      expect(getCurrentElement()?.outerHTML).toBe(`<div><span></span></div>`);
      expect(getCurrentElement()?.firstElementChild?.outerHTML).toBe(
        `<span></span>`
      );
    }, createElement('div', false));
  });

  it('svg', () => {
    render(() => {
      h.svg();
      expect(getCurrentElement()!.namespaceURI).toBe(svgNS);
    }, createElement('div', false));
  });

  it('nest html tag in svg', () => {
    render(() => {
      h.svg(() => {
        h.foreignObject(() => {
          h.div();
          expect(getCurrentElement()?.namespaceURI).toBe(htmlNS);
        });
        expect(getCurrentElement()?.namespaceURI).toBe(svgNS);
      });

      expect(getCurrentElement()?.outerHTML).toBe(
        `<svg><foreignObject><div></div></foreignObject></svg>`
      );
    }, createElement('div', false));
  });
});
