import {
  clearFragmentChildren,
  getCurrentElement,
  getCurrntBlockFragment,
  HopeElement,
  nextTick,
} from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import {
  hProp,
  div,
  $div,
  block,
  defineComponent,
  hText,
  mount,
} from '../../src';
import { delay, LIFECYCLE_KEYS } from '@hopejs/shared';
import { createElement } from '@hopejs/renderer';

describe('hProp', () => {
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
    div();
    hProp({ [KEY]: '123' });
    // @ts-ignore
    expect(getCurrentElement()[KEY]).toBe(`123`);
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div();
    hProp({ [KEY]: () => state.name });
    const el = getCurrentElement();
    // @ts-ignore
    expect(el[KEY]).toBe(`a`);
    $div();

    state.name = 'b';
    await nextTick();
    // @ts-ignore
    expect(el[KEY]).toBe(`b`);
  });

  it('reactivity object', async () => {
    const props = reactive({ [KEY]: 'a' });

    div();
    hProp(props);
    const el = getCurrentElement();
    // @ts-ignore
    expect(el[KEY]).toBe(`a`);
    $div();

    props[KEY] = 'b';
    await nextTick();
    // @ts-ignore
    expect(el[KEY]).toBe(`b`);

    // @ts-ignore
    // 应该新增一个 id 属性
    props._abc = 'c';
    await nextTick();
    // @ts-ignore
    expect(el._abc).toBe(`c`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div();
      hProp({ [KEY]: () => 'name' });
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;
    block(() => {
      div();
      hProp({ [KEY]: 'name' });
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
      testComponent();
      hProp({ a: () => 'a' });
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
      testComponent();
      hProp({ b: 'b' });
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
