import { NS } from '@/shared';
import {
  end,
  getCurrentElement,
  getFragment,
  shouldAsSVG,
  mount,
  start,
} from '@/core';
import { comWithSlot } from '../common';

describe('start & end & mount', () => {
  it('basic', () => {
    comWithSlot(() => {
      start('div');
      const div = getCurrentElement();
      expect(div?.outerHTML).toBe('<div></div>');
      expect(getFragment().children[0]).toBe(div);
      start('span');
      const span = getCurrentElement();
      expect(span?.outerHTML).toBe('<span></span>');
      expect(span?.parentNode).toBe(div);
      expect(getFragment().children.length).toBe(1);
      end();
      expect(getCurrentElement()).toBe(div);
      end();
      expect(getCurrentElement()).toBe(undefined);
      expect(getFragment().children.length).toBe(1);
      expect(getFragment().children[0]).toBe(div);
      expect(div?.outerHTML).toBe('<div><span></span></div>');
    });

    // mount
    const container = document.createElement('div');
    mount(container);
    expect(container.innerHTML).toBe(
      '<!--component start--><div><span></span></div><!--component end-->'
    );
  });

  it('shouldAsSVG', () => {
    comWithSlot(() => {
      start('div');
      expect(shouldAsSVG('')).toBe(false);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.XHTML);
      end();

      start('svg');
      expect(shouldAsSVG('')).toBe(true);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
      end();

      start('svg');
      start('foreignObject');
      expect(shouldAsSVG('')).toBe(false);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
      end();
      end();

      start('svg');
      start('foreignObject');
      start('div');
      expect(shouldAsSVG('')).toBe(false);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.XHTML);
      end();
      end();
      end();

      start('svg');
      start('foreignObject');
      start('div');
      start('svg');
      expect(shouldAsSVG('')).toBe(true);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
      end();
      end();
      end();
      end();

      start('svg');
      start('foreignObject');
      start('div');
      start('svg');
      start('foreignObject');
      expect(shouldAsSVG('')).toBe(false);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
      end();
      end();
      end();
      end();
      end();
    });
  });
});
