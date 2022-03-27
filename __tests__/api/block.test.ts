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
import { delay, NS, LIFECYCLE_KEYS } from '@/shared';
import { div, span, $div, hText, mount, $span, defineComponent } from '@/api';
import { hIf } from '@/api/directives/hIf';
import { refresh } from '@/core/scheduler';

describe('hIf', () => {
  it('basic', async () => {
    const state = {
      toggle: true,
    };
    const [com, $com] = defineComponent<{ toggle: boolean }>(({ props }) => {
      hIf(
        () => props.toggle,
        () => {
          div();
          hText('1');
          $div();
        },
        () => {
          span();
          hText('2');
          $span();
        }
      );
    });

    com({ toggle: () => state.toggle });
    $com();

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><!--block start--><div>1</div><!--block end--><!--component end-->'
    );
    state.toggle = false;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><!--block start--><span>2</span><!--block end--><!--component end-->'
    );
  });

  it('reactivity & remove', async () => {
    clearFragmentChildren();
    let el: Element;
    const state = {
      show: true,
      text: 'a',
    };

    const [com, $com] = defineComponent<{ show: boolean; text: string }>(
      ({ props }) => {
        hIf(
          () => props.show,
          () => {
            div();
            hText(() => props.text);
            el = getCurrentElement()!;
            $div();
          }
        );
      }
    );

    com({ show: () => state.show, text: () => state.text });
    $com();

    const container = document.createElement('div');
    mount(container);
    await delay();

    expect(container.innerHTML).toBe(
      `<!--component start--><!--block start--><div>a</div><!--block end--><!--component end-->`
    );
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>a</div>`);

    state.text = 'b';
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--block start--><div>b</div><!--block end--><!--component end-->`
    );
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>b</div>`);

    state.show = false;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--block start--><!--block end--><!--component end-->`
    );
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>b</div>`);

    // 已经 remove 的元素不应该再被响应
    state.text = 'c';
    refresh();
    await nextTick();
    // @ts-ignore
    expect(el.outerHTML).toBe(`<div>b</div>`);
  });

  it('nest element', async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent(() => {
      hIf(true, () => {
        div();
        div();
        $div();
        $div();
      });
    });

    com();
    $com();

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div><div></div></div><!--component end-->`
    );
  });

  it('nest block', async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent(() => {
      hIf(true, () => {
        hIf(true, () => {
          div();
          $div();
        });
      });
    });

    com();
    $com();

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div></div><!--component end-->`
    );
  });

  it('nest block & nest element', async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent(() => {
      hIf(true, () => {
        div();
        hIf(true, () => {
          div();
          $div();
        });
        $div();
      });
    });

    com();
    $com();

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div><div></div></div><!--component end-->`
    );
  });

  it('nest block & not nest element', async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent(() => {
      hIf(true, () => {
        div();
        $div();
        hIf(true, () => {
          div();
          $div();
        });
      });
    });

    com();
    $com();

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div></div><div></div><!--component end-->`
    );
  });

  it('elementUnmounted', async () => {
    clearFragmentChildren();
    let el: HopeElement;
    let el2: HopeElement;

    const [com, $com] = defineComponent(() => {
      hIf(true, () => {
        div();
        el = getCurrentElement()!;
        $div();
        hIf(true, () => {
          div();
          $div();
        });
      });

      hIf(
        () => true,
        () => {
          div({ class: () => 'nothing' });
          el2 = getCurrentElement()!;
          hIf(true, () => {
            div();
            $div();
          });
          $div();
        }
      );
    });

    com();
    $com();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(void 0);
    // @ts-ignore
    expect(el2[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
    // @ts-ignore
    expect(typeof Array.from(el2[LIFECYCLE_KEYS.elementUnmounted])[0]).toBe(
      'function'
    );
  });

  it('with shouldAsSVG', async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent(() => {
      hIf(
        () => true,
        () => {
          expect(shouldAsSVG('')).toBe(false);
          expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(false);
        }
      );

      start('svg');
      hIf(
        () => true,
        () => {
          expect(shouldAsSVG('')).toBe(true);
          expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(true);
        }
      );
      end();
    });

    com();
    $com();
  });

  it('dynamic & shouldAsSVG', async () => {
    clearFragmentChildren();
    const state = { show: true };
    const [com, $com] = defineComponent<{ show: boolean }>(({ props }) => {
      start('svg');
      hIf(
        () => props.show,
        () => {
          start('foreignObject');
          expect(shouldAsSVG('')).toBe(false);
          expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(true);
          expect(getCurrentElement()!.namespaceURI).toBe(NS.SVG);
          end();
        },
        () => {
          start('foreignObject');
          start('div');
          expect(shouldAsSVG('')).toBe(false);
          expect(getCurrntBlockFragment()!._shouldAsSVG).toBe(true);
          expect(getCurrentElement()!.namespaceURI).toBe(NS.XHTML);
          end();
          end();
        }
      );
      end();
    });

    com({ show: () => state.show });
    $com();

    const container = createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><svg><!--block start--><foreignObject></foreignObject><!--block end--></svg><!--component end-->'
    );

    state.show = false;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><svg><!--block start--><foreignObject><div></div></foreignObject><!--block end--></svg><!--component end-->'
    );

    state.show = true;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><svg><!--block start--><foreignObject></foreignObject><!--block end--></svg><!--component end-->'
    );

    state.show = false;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><svg><!--block start--><foreignObject><div></div></foreignObject><!--block end--></svg><!--component end-->'
    );
  });
});
