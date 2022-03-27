import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { LIFECYCLE_KEYS } from '@/shared';
import { div, $div } from '@/api';

describe('style', () => {
  it('basic', () => {
    div({ style: { color: 'red' } });
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div style="color: red;"></div>`);
    $div();
  });

  it('array', () => {
    const obj1 = { color: 'red' };
    const obj2 = { backgroundColor: 'red' };
    div({ style: [obj1, obj2] });
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(
      `<div style="color: red; background-color: red;"></div>`
    );
    $div();
  });

  it('reactivity', async () => {
    const color = { value: 'red' };

    div({ style: () => ({ color: color.value }) });
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div style="color: red;"></div>`);
    $div();

    color.value = 'blue';
    await nextTick();
    expect(el?.outerHTML).toBe(`<div style="color: blue;"></div>`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    div({ style: () => ({ color: 'red' }) });
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;
    div({ style: { color: 'red' } });
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
