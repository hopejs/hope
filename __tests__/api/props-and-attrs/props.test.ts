import {
  clearFragmentChildren,
  getCurrentElement,
  getCurrntBlockFragment,
  HopeElement,
  nextTick,
} from '@/core';
import { reactive } from '@/reactivity';
import { delay, LIFECYCLE_KEYS } from '@/shared';
import { createElement } from '@/renderer';
import { div, $div, block, defineComponent, hText, mount } from '@/api';

describe('props', () => {
  const KEY = '_hopejs_test';
  const [testComponent, $testComponent] = defineComponent<any, any>(
    ({ props }) => {
      div();
      hText(props.a);
      hText(props.b);
      $div();
    }
  );

  it('basic', () => {
    div({ [KEY]: '123' });
    // @ts-ignore
    expect(getCurrentElement()!.outerHTML).toBe(
      '<div _hopejs_test="123"></div>'
    );
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div({ [KEY]: () => state.name });
    const el = getCurrentElement();
    // @ts-ignore
    expect(el.outerHTML).toBe('<div _hopejs_test="a"></div>');
    $div();

    state.name = 'b';
    await nextTick();
    // @ts-ignore
    expect(el.outerHTML).toBe('<div _hopejs_test="b"></div>');
  });

  it('reactivity object', async () => {
    const props = reactive({ [KEY]: 'a' });

    div(props);
    const el = getCurrentElement();
    // @ts-ignore
    expect(el.outerHTML).toBe('<div _hopejs_test="a"></div>');
    $div();
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div({ [KEY]: () => 'name' });
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;
    block(() => {
      div({ [KEY]: 'name' });
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });

  it('elementUnmounted & with component', async () => {
    // 清空之前测试添加到 fragment 的内容
    clearFragmentChildren();

    let startPlaceholder: HopeElement;
    block(() => {
      testComponent({ a: () => 'a' });
      startPlaceholder = getCurrntBlockFragment()?._elementStack[0]!;
      $testComponent();
    });

    const container = createElement('div');
    mount(container);
    await delay();

    // @ts-ignore
    expect(startPlaceholder[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
    expect(container.innerHTML).toBe(
      '<!--block start--><!--component start--><div>a</div><!--component end--><!--block end-->'
    );
  });

  it('elementUnmounted & no reactivity & with component', async () => {
    let startPlaceholder: HopeElement;
    block(() => {
      testComponent({ b: 'b' });
      startPlaceholder = getCurrntBlockFragment()?._elementStack[0]!;
      $testComponent();
    });

    const container = createElement('div');
    mount(container);
    await delay();

    // @ts-ignore
    expect(startPlaceholder[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
    expect(container.innerHTML).toBe(
      '<!--block start--><!--component start--><div>b</div><!--component end--><!--block end-->'
    );
  });
});
