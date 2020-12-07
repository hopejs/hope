import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import { hAttr, div, $div, block } from '../../src';
import { LIFECYCLE_KEYS } from '@hopejs/shared';

describe('hAttr', () => {
  it('basic', () => {
    div();
    hAttr({ abc: 'abc' });
    expect(getCurrentElement()?.outerHTML).toBe(`<div abc="abc"></div>`);
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div();
    hAttr({ abc: () => state.name });
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div abc="a"></div>`);
    $div();

    state.name = 'b';
    await nextTick();
    expect(el?.outerHTML).toBe(`<div abc="b"></div>`);
  });

  it('reactivity object', async () => {
    const attr = reactive({ class: 'a' });

    div();
    hAttr(attr);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div class="a"></div>`);
    $div();

    attr.class = 'b';
    await nextTick();
    expect(el?.outerHTML).toBe(`<div class="b"></div>`);

    // @ts-ignore
    // 应该新增一个 id 属性
    attr.id = 'c';
    await nextTick();
    expect(el?.outerHTML).toBe(`<div class="b" id="c"></div>`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div();
      hAttr({ class: () => 'name' });
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
      hAttr({ class: 'name' });
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
