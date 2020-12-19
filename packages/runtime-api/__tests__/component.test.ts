import { createElement } from '@hopejs/renderer';
import { delay } from '@hopejs/shared';
import { reactive } from '@hopejs/reactivity';
import { getCurrentElement } from '@hopejs/runtime-core';
import { div$, defineComponent, div$$, mount, nextTick } from '../src';

describe('component', () => {
  const container = createElement('div');

  it('props', async () => {
    const [com, $com] = defineComponent<{ text: string }, any>(({ props }) => {
      div$({ class: () => props.text });
      div$$();
    });

    com({ text: 'class-name' });
    $com();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div class="class-name"></div><!--component end-->'
    );

    // reactivity
    const state = reactive({ text: 'a' });
    com({ text: () => state.text });
    $com();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div class="a"></div><!--component end-->'
    );
    state.text = 'b';
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><div class="b"></div><!--component end-->'
    );
  });

  it('event', async () => {
    let el: any;
    const [com, $com] = defineComponent<{ onComClick: any }, any>(
      ({ emit }) => {
        div$({ onClick: () => emit('comClick', 123) });
        el = getCurrentElement()!;
        div$$();
      }
    );

    const handle = jest.fn((param) => expect(param).toBe(123));
    com({ onComClick: handle });
    $com();

    mount(container);
    await delay();
    el.dispatchEvent(new CustomEvent('click'));
    expect(handle).toBeCalledTimes(1);

    // modifier & once
    com({ onComClick$once: handle });
    $com();
    mount(container);
    await delay();
    el.dispatchEvent(new CustomEvent('click'));
    expect(handle).toBeCalledTimes(2);
    // 用来 once 修饰符，只调用一次
    el.dispatchEvent(new CustomEvent('click'));
    expect(handle).toBeCalledTimes(2);
  });
});
