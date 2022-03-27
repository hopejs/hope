import { createElement } from '@/renderer';
import {
  clearFragmentChildren,
  end,
  getCurrentElement,
  getCurrntBlockFragment,
  shouldAsSVG,
  nextTick,
  start,
  HopeElement,
} from '@/core';
import { delay, NS } from '@/shared';
import { div, span, $div, hText, mount, $span } from '@/api';
import { hIf } from '@/api/directives/hIf';

describe('hIf', () => {
  it('basic', async () => {
    const state = {
      toggle: true,
    };

    hIf(() => state.toggle, () => {
      div();
        hText('1');
      $div();
    }, () => {
      span();
        hText('2');
      $span();
    })

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--block start--><div>1</div><!--block end-->'
    );
    state.toggle = false;
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--block start--><span>2</span><!--block end-->'
    );
  });

  it('reactivity & remove', async () => {
    let el: Element;
    const state = {
      show: true,
      text: 'a',
    };

    hIf(() => state.show, () => {
      div();
        hText(() => state.text);
        el = getCurrentElement()!;
      $div();
    })
    const container = document.createElement('div');
    mount(container);
    await delay();

    expect(container.innerHTML).toBe(
      `<!--block start--><div>a</div><!--block end-->`
    );
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>a</div>`);

    state.text = 'b';
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--block start--><div>b</div><!--block end-->`
    );
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>b</div>`);

    state.show = false;
    await nextTick();
    expect(container.innerHTML).toBe(`<!--block start--><!--block end-->`);
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>b</div>`);

    // 已经 remove 的元素不应该再被响应
    state.text = 'c';
    await nextTick();
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>b</div>`);
  });

  it('nest element', async () => {
    hIf(true, () => {
      div();
      div();
      $div();
      $div();
    })

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--block start--><div><div></div></div><!--block end-->`
    );
  });

  it('nest block', async () => {
    hIf(true, () => {
      hIf(true, () => {
        div();
        $div();
      });
    });

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--block start--><!--block start--><div></div><!--block end--><!--block end-->`
    );
  });

  it('nest block & nest element', async () => {
    hIf(true, () => {
      div();
      hIf(true, () => {
        div();
        $div();
      });
      $div();
    });

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--block start--><div><!--block start--><div></div><!--block end--></div><!--block end-->`
    );
  });

  it('nest block & not nest element', async () => {
    hIf(true, () => {
      div();
      $div();
      hIf(true, () => {
        div();
        $div();
      });
    });

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--block start--><div></div><!--block start--><div></div><!--block end--><!--block end-->`
    );
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    hIf(true, () => {
      div();
      el = getCurrentElement()!;
      $div();
      hIf(true, () => {
        div();
        $div();
      });
    });
    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);

    let el2: HopeElement;
    hIf(true, () => {
      div();
      el2 = getCurrentElement()!;
      hIf(true, () => {
        div();
        $div();
      });
      $div();
    });
    // @ts-ignore
    expect(el2[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
    // @ts-ignore
    expect(typeof Array.from(el2[LIFECYCLE_KEYS.elementUnmounted])[0]).toBe(
      'function'
    );
  });

  it('with shouldAsSVG', () => {
    hIf(true, () => {
      expect(shouldAsSVG('')).toBe(false);
      expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(false);
    });

    start('svg');
    hIf(true, () => {
      expect(shouldAsSVG('')).toBe(true);
      expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(true);
    });
    end();
  });

  it('dynamic & shouldAsSVG', async () => {
    clearFragmentChildren();
    const state = { show: true };

    start('svg');
    hIf(() => state.show, () => {
      start('foreignObject');
      expect(shouldAsSVG('')).toBe(false);
      expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(true);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
      end();
    }, () => {
      start('foreignObject');
      start('div');
      expect(shouldAsSVG('')).toBe(false);
      expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(true);
      expect(getCurrentElement()!.namespaceURI).toBe(NS.XHTML);
      end();
      end();
    })
    end();

    const container = createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<svg><!--block start--><foreignObject></foreignObject><!--block end--></svg>'
    );

    state.show = false;
    await nextTick();
    expect(container.innerHTML).toBe(
      '<svg><!--block start--><foreignObject><div></div></foreignObject><!--block end--></svg>'
    );

    state.show = true;
    await nextTick();
    expect(container.innerHTML).toBe(
      '<svg><!--block start--><foreignObject></foreignObject><!--block end--></svg>'
    );

    state.show = false;
    await nextTick();
    expect(container.innerHTML).toBe(
      '<svg><!--block start--><foreignObject><div></div></foreignObject><!--block end--></svg>'
    );
  });
});
