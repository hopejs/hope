import { createElement } from '@/renderer';
import { getCurrentElement, HopeElement, mount, nextTick } from '@/core';
import { delay } from '@/shared';
import { $div, defineComponent, div } from '@/api';
import { refresh } from '@/core/scheduler';
import { comWithSlot } from '../common';

describe('tag props', () => {
  const container = createElement('div');

  it('class', async () => {
    const [com, $com] = defineComponent(() => {
      div({ class: 'class-name' });
      $div();
    });

    com();
    $com();

    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div class="class-name"></div><!--component end-->'
    );
  });

  it('class & reactivity', async () => {
    const state = { name: 'a', isActive: true };
    const [com, $com] = defineComponent(() => {
      div({ class: () => state.name });
      $div();
    });

    com();
    $com();

    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div class="a"></div><!--component end-->'
    );
    state.name = 'b';
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><div class="b"></div><!--component end-->'
    );
  });

  it('style', async () => {
    comWithSlot(() => {
      div({ style: { color: 'red' } });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: red;"></div><!--component end-->'
    );

    // property is a function
    comWithSlot(() => {
      div({ style: { color: () => 'red' } });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: red;"></div><!--component end-->'
    );

    // function
    comWithSlot(() => {
      div({ style: () => ({ color: 'red' }) });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: red;"></div><!--component end-->'
    );

    // array
    comWithSlot(() => {
      div({ style: [{ color: 'red' }, { width: '100px' }] });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: red; width: 100px;"></div><!--component end-->'
    );
  });

  it('style & reactivity', async () => {
    const state = { color: 'red' };

    // property is a function
    comWithSlot(() => {
      div({ style: { color: () => state.color } });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: red;"></div><!--component end-->'
    );
    state.color = 'blue';
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: blue;"></div><!--component end-->'
    );

    // function
    comWithSlot(() => {
      div({ style: () => ({ color: state.color }) });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: blue;"></div><!--component end-->'
    );
    state.color = 'red';
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: red;"></div><!--component end-->'
    );

    // array
    comWithSlot(() => {
      div({ style: () => [{ color: state.color }] });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: red;"></div><!--component end-->'
    );
    state.color = 'black';
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><div style="color: black;"></div><!--component end-->'
    );
  });

  it('id', async () => {
    // basic
    comWithSlot(() => {
      div({ id: 'id-name' });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div id="id-name"></div><!--component end-->'
    );

    // reactivity
    const state = { id: 'a' };
    comWithSlot(() => {
      div({ id: () => state.id });
      $div();
    });
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<!--component start--><div id="a"></div><!--component end-->'
    );
    state.id = 'b';
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><div id="b"></div><!--component end-->'
    );
    // 应该删除 id 属性
    state.id = null as any;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      '<!--component start--><div></div><!--component end-->'
    );
  });

  it('event', async () => {
    const handle = jest.fn();
    let el: HopeElement;

    comWithSlot(() => {
      div({ onClick: handle });
      el = getCurrentElement()!;
      $div();
    });
    mount(container);
    await delay();
    //@ts-ignore
    el.dispatchEvent(new CustomEvent('click'));
    ``;
    expect(handle).toBeCalledTimes(1);
    //@ts-ignore
    el.dispatchEvent(new CustomEvent('click'));
    expect(handle).toBeCalledTimes(2);

    // modifier
    const handle2 = jest.fn();
    let el2: HopeElement;
    comWithSlot(() => {
      div({ onClick$once: handle2 });
      el2 = getCurrentElement()!;
      $div();
    });
    mount(container);
    await delay();
    //@ts-ignore
    el2.dispatchEvent(new CustomEvent('click'));
    expect(handle2).toBeCalledTimes(1);
    //@ts-ignore
    el2.dispatchEvent(new CustomEvent('click'));
    expect(handle2).toBeCalledTimes(1);
  });
});
