import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import { hClass, div, $div, block } from '../../src';
import { LIFECYCLE_KEYS } from '@hopejs/shared';

describe('hClass', () => {
  it('basic', () => {
    div();
    hClass('some');
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="some"></div>`);
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div();
    hClass(() => state.name);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div class="a"></div>`);
    $div();

    state.name = 'b';
    await nextTick();
    expect(el?.outerHTML).toBe(`<div class="b"></div>`);
  });

  it('object', () => {
    div();
    hClass({ some: true });
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="some"></div>`);
    $div();

    div();
    hClass({ some: false });
    expect(getCurrentElement()?.outerHTML).toBe(`<div></div>`);
    $div();
  });

  it('array', () => {
    div();
    hClass(['some']);
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="some"></div>`);
    $div();

    div();
    hClass(['some', 'thing']);
    expect(getCurrentElement()?.outerHTML).toBe(
      `<div class="some thing"></div>`
    );
    $div();
  });

  it('object & array', () => {
    div();
    hClass([{ some: true }, 'thing']);
    expect(getCurrentElement()?.outerHTML).toBe(
      `<div class="some thing"></div>`
    );
    $div();

    div();
    hClass([{ some: false }, 'thing']);
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="thing"></div>`);
    $div();
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div();
      hClass(() => 'name');
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
      hClass('name');
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
