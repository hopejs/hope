import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import { hId, div, $div, block } from '../../src';
import { LIFECYCLE_KEYS } from '@hopejs/shared';

describe('hId', () => {
  it('basic', () => {
    div();
    hId('some');
    expect(getCurrentElement()?.outerHTML).toBe(`<div id="some"></div>`);
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div();
    hId(() => state.name);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div id="a"></div>`);
    $div();

    state.name = 'b';
    await nextTick();
    expect(el?.outerHTML).toBe(`<div id="b"></div>`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div();
      hId(() => 'name');
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
      hId('name');
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
