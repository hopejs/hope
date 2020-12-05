import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import { hAttr, div, $div, block } from '../../src';
import { LIFECYCLE_KEYS } from '@hopejs/shared';

describe('hAttr', () => {
  it('basic', () => {
    div();
    hAttr('abc', 'abc');
    expect(getCurrentElement()?.outerHTML).toBe(`<div abc="abc"></div>`);
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div();
    hAttr('abc', () => state.name);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div abc="a"></div>`);
    $div();

    state.name = 'b';
    await nextTick();
    expect(el?.outerHTML).toBe(`<div abc="b"></div>`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div();
      hAttr('class', () => 'name');
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
      hAttr('class', 'name');
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
