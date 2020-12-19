import { createElement } from '@hopejs/renderer';
import { getCurrentElement, mount, nextTick } from '@hopejs/runtime-core';
import { delay } from '@hopejs/shared';
import { reactive } from '@hopejs/reactivity';
import { div$, div$$ } from '../src';

describe('tag props', () => {
  const container = createElement('div');

  it('class', async () => {
    // string
    div$({ class: 'class-name' });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div class="class-name"></div>');

    // object
    div$({ class: { 'class-name': true } });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div class="class-name"></div>');

    div$({ class: { 'class-name': false } });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div></div>');

    // array
    div$({ class: [{ 'class-name': true }, { 'second-name': true }] });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<div class="class-name second-name"></div>'
    );
  });

  it('class & reactivity', async () => {
    const state = reactive({ name: 'a', isActive: true });

    // string
    div$({ class: () => state.name });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div class="a"></div>');
    state.name = 'b';
    await nextTick();
    expect(container.innerHTML).toBe('<div class="b"></div>');

    // object
    div$({ class: { active: () => state.isActive } });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div class="active"></div>');
    state.isActive = false;
    await nextTick();
    expect(container.innerHTML).toBe('<div></div>');

    // nest function
    div$({ class: () => ({ active: () => state.isActive }) });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div></div>');
    state.isActive = true;
    await nextTick();
    expect(container.innerHTML).toBe('<div class="active"></div>');

    // function
    div$({ class: () => ({ active: state.isActive }) });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div class="active"></div>');
    state.isActive = false;
    await nextTick();
    expect(container.innerHTML).toBe('<div></div>');

    // function & array
    div$({ class: () => [{ active: state.isActive }] });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div></div>');
    state.isActive = true;
    await nextTick();
    expect(container.innerHTML).toBe('<div class="active"></div>');

    // array
    div$({ class: [{ active: () => state.isActive }] });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div class="active"></div>');
    state.isActive = false;
    await nextTick();
    expect(container.innerHTML).toBe('<div></div>');
  });

  it('style', async () => {
    // basic
    div$({ style: { color: 'red' } });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');

    // property is a function
    div$({ style: { color: () => 'red' } });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');

    // function
    div$({ style: () => ({ color: 'red' }) });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');

    // nest function
    div$({ style: () => ({ color: () => 'red' }) });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');

    // array
    div$({ style: [{ color: 'red' }, { width: '100px' }] });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      '<div style="color: red; width: 100px;"></div>'
    );
  });

  it('style & reactivity', async () => {
    const state = reactive({ color: 'red' });

    // property is a function
    div$({ style: { color: () => state.color } });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');
    state.color = 'blue';
    await nextTick();
    expect(container.innerHTML).toBe('<div style="color: blue;"></div>');

    // function
    div$({ style: () => ({ color: state.color }) });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: blue;"></div>');
    state.color = 'red';
    await nextTick();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');

    // nest function
    div$({ style: () => ({ color: () => state.color }) });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');
    state.color = 'blue';
    await nextTick();
    expect(container.innerHTML).toBe('<div style="color: blue;"></div>');

    // array
    div$({ style: () => [{ color: state.color }] });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div style="color: blue;"></div>');
    state.color = 'red';
    await nextTick();
    expect(container.innerHTML).toBe('<div style="color: red;"></div>');
  });

  it('id', async () => {
    // basic
    div$({ id: 'id-name' });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div id="id-name"></div>');

    // reactivity
    const state = reactive({ id: 'a' });
    div$({ id: () => state.id });
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe('<div id="a"></div>');
    state.id = 'b';
    await nextTick();
    expect(container.innerHTML).toBe('<div id="b"></div>');
    // 应该删除 id 属性
    state.id = null as any;
    await nextTick();
    expect(container.innerHTML).toBe('<div></div>');
  });

  it('event', async () => {
    const handle = jest.fn();
    div$({ onClick: handle });
    const el = getCurrentElement()!;
    div$$();
    mount(container);
    await delay();
    el.dispatchEvent(new CustomEvent('click'));
    expect(handle).toBeCalledTimes(1);
    el.dispatchEvent(new CustomEvent('click'));
    expect(handle).toBeCalledTimes(2);

    // modifier
    const handle2 = jest.fn();
    div$({ onClick$once: handle2 });
    const el2 = getCurrentElement()!;
    div$$();
    mount(container);
    await delay();
    el2.dispatchEvent(new CustomEvent('click'));
    expect(handle2).toBeCalledTimes(1);
    el2.dispatchEvent(new CustomEvent('click'));
    expect(handle2).toBeCalledTimes(1);
  });
});
