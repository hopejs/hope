import { getCurrentElement, h, render } from '@/html';
import { getCurrentContainer, getFragment } from '@/html/makeRenderTree';
import { htmlNS, svgNS } from '@/utils';

describe('html', () => {
  it('div', () => {
    render(() => {
      h.div();
      expect(getCurrentElement()?.outerHTML).toBe(`<div></div>`);
      expect(getCurrentContainer()).toBe(getFragment());
      expect(getFragment()?.firstChild === getCurrentElement()).toBe(true);
    });
  });

  it('div with text', () => {
    render(() => {
      h.div('text');
      expect(getCurrentElement()?.outerHTML).toBe(`<div>text</div>`);
      expect(getFragment()?.firstElementChild?.outerHTML).toBe(
        `<div>text</div>`
      );
    });
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
      expect(getCurrentContainer()).toBe(getFragment());
      expect(getFragment()?.firstChild === getCurrentElement()).toBe(true);
    });
  });

  it('div with class name', () => {
    render(() => {
      h.div({ class: 'class-name' });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div class="class-name"></div>`
      );
    });
  });

  it('div with inline style', () => {
    render(() => {
      h.div({ style: 'width: 100px; height: 100px;' });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div style=\"width: 100px; height: 100px;\"></div>`
      );
    });
  });

  it('div with object style', () => {
    render(() => {
      h.div({ style: { width: '100px', height: '100px' } });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div style=\"width: 100px; height: 100px;\"></div>`
      );
    });
  });

  it('div with innerHTML', () => {
    render(() => {
      h.div({ innerHTML: `<span></span>` });
      expect(getCurrentElement()?.outerHTML).toBe(`<div><span></span></div>`);
      expect(getCurrentElement()?.firstElementChild?.outerHTML).toBe(
        `<span></span>`
      );
    });
  });

  it('svg', () => {
    render(() => {
      h.svg();
      expect(getCurrentElement()!.namespaceURI).toBe(svgNS);
    });
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
    });
  });
});
