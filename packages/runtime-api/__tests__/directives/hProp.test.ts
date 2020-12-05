import {
  getCurrentElement,
  getCurrntBlockFragment,
  HopeElement,
  nextTick,
} from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import { hProp, div, $div, block, defineComponent } from '../../src';
import { LIFECYCLE_KEYS } from '@hopejs/shared';

describe('hProp', () => {
  const KEY = '_hopejs_test';
  const [testComponent, $testComponent] = defineComponent<any, any>(
    ({ props }) => {
      div();
      $div();
    }
  );

  it('basic', () => {
    div();
    hProp(KEY, '123');
    // @ts-ignore
    expect(getCurrentElement()[KEY]).toBe(`123`);
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div();
    hProp(KEY, () => state.name);
    const el = getCurrentElement();
    // @ts-ignore
    expect(el[KEY]).toBe(`a`);
    $div();

    state.name = 'b';
    await nextTick();
    // @ts-ignore
    expect(el[KEY]).toBe(`b`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div();
      hProp(KEY, () => 'name');
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
      hProp(KEY, 'name');
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });

  it('elementUnmounted & with component', () => {
    let startPlaceholder: HopeElement;
    block(() => {
      testComponent();
      hProp('a', () => 'name');
      startPlaceholder = getCurrntBlockFragment()?._elementStack[0]!;
      $testComponent();
    });

    // @ts-ignore
    expect(startPlaceholder[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity & with component', () => {
    let startPlaceholder: HopeElement;
    block(() => {
      testComponent();
      hProp('b', 'name');
      startPlaceholder = getCurrntBlockFragment()?._elementStack[0]!;
      $testComponent();
    });

    // @ts-ignore
    expect(startPlaceholder[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
