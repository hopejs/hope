import {
  clearFragmentChildren,
  getCurrentElement,
  HopeElement,
  nextTick,
} from '@/core';
import { delay, LIFECYCLE_KEYS } from '@/shared';
import { createElement } from '@/renderer';
import { div, $div, defineComponent, hText, mount } from '@/api';
import { refresh } from '@/core/scheduler';
import { hIf } from '@/api/directives/hIf';
import { comWithSlot } from '../../common';

describe('props', () => {
  const KEY = '_hopejs_test';

  it('basic', () => {
    // 清空之前测试添加到 fragment 的内容
    clearFragmentChildren();

    comWithSlot(() => {
      div({ [KEY]: '123' });
      // @ts-ignore
      expect(getCurrentElement()!.outerHTML).toBe(
        '<div _hopejs_test="123"></div>'
      );
      $div();
    });
  });

  it('reactivity', async () => {
    // 清空之前测试添加到 fragment 的内容
    clearFragmentChildren();
    const state = { name: 'a' };
    let el: HopeElement;

    comWithSlot(() => {
      div({ [KEY]: () => state.name });
      el = getCurrentElement()!;
      // @ts-ignore
      expect(el.outerHTML).toBe('<div _hopejs_test="a"></div>');
      $div();
    });

    state.name = 'b';
    refresh();
    await nextTick();
    // @ts-ignore
    expect(el.outerHTML).toBe('<div _hopejs_test="b"></div>');
  });

  it('reactivity object', async () => {
    // 清空之前测试添加到 fragment 的内容
    clearFragmentChildren();

    comWithSlot(() => {
      const props = { [KEY]: 'a' };

      div(props);
      const el = getCurrentElement();
      // @ts-ignore
      expect(el.outerHTML).toBe('<div _hopejs_test="a"></div>');
      $div();
    });
  });

  it('elementUnmounted', () => {
    let el: HopeElement;

    comWithSlot(() => {
      hIf(
        () => true,
        () => {
          div({ [KEY]: () => 'name' });
          el = getCurrentElement()!;
          $div();
        }
      );
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;

    comWithSlot(() => {
      div({ [KEY]: 'name' });
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });

  it('no reactivity & with component', async () => {
    // 清空之前测试添加到 fragment 的内容
    clearFragmentChildren();
    const [com, $com] = defineComponent<any, any>(({ props }) => {
      div();
      hText(props.a);
      hText(props.b);
      $div();
    });

    com({ b: 'b' });
    $com();

    const container = createElement('div');
    mount(container);
    await delay();

    expect(container.innerHTML).toBe(
      '<!--component start--><div>b</div><!--component end-->'
    );
  });
});
