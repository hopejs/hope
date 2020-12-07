import { NS } from '@hopejs/shared';
import {
  end,
  getCurrentElement,
  getFragment,
  isSVG,
  mount,
  start,
} from '../src';

describe('start & end & mount', () => {
  it('basic', () => {
    start('div');
    const div = getCurrentElement();
    expect(div?.outerHTML).toBe('<div></div>');
    expect(getFragment().firstChild).toBe(div);
    start('span');
    const span = getCurrentElement();
    expect(span?.outerHTML).toBe('<span></span>');
    expect(span?.parentNode).toBe(div);
    expect(getFragment().childNodes.length).toBe(1);
    end();
    expect(getCurrentElement()).toBe(div);
    end();
    expect(getCurrentElement()).toBe(undefined);
    expect(getFragment().childNodes.length).toBe(1);
    expect(getFragment().firstChild).toBe(div);
    expect(div?.outerHTML).toBe('<div><span></span></div>');

    // mount
    const container = document.createElement('div');
    mount(container);
    expect(container.innerHTML).toBe('<div><span></span></div>');
  });

  it('isSVG', () => {
    start('div');
    expect(isSVG('')).toBe(false);
    expect(getCurrentElement()!.namespaceURI).toBe(NS.XHTML);
    end();

    start('svg');
    expect(isSVG('')).toBe(true);
    expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
    end();

    start('svg');
    start('foreignObject');
    expect(isSVG('')).toBe(false);
    expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
    end();
    end();

    start('svg');
    start('foreignObject');
    start('div');
    expect(isSVG('')).toBe(false);
    expect(getCurrentElement()!.namespaceURI).toBe(NS.XHTML);
    end();
    end();
    end();

    start('svg');
    start('foreignObject');
    start('div');
    start('svg');
    expect(isSVG('')).toBe(true);
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
    expect(isSVG('')).toBe(false);
    expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
    end();
    end();
    end();
    end();
    end();
  });
});
