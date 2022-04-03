import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { div, $div } from '@/api';
import { refresh } from '@/core/scheduler';
import { LIFECYCLE_KEYS } from '@/shared';
import { hIf } from '@/api/directives/hIf';
import { comWithSlot } from '../../common';

describe('style', () => {
  it('basic', () => {
    comWithSlot(() => {
      div({ style: { color: 'red' } });
      const el = getCurrentElement();
      expect(el?.outerHTML).toBe(`<div style="color: red;"></div>`);
      $div();
    });
  });

  it('array', () => {
    comWithSlot(() => {
      const obj1 = { color: 'red' };
      const obj2 = { backgroundColor: 'red' };
      div({ style: [obj1, obj2] });
      const el = getCurrentElement();
      expect(el?.outerHTML).toBe(
        `<div style="color: red; background-color: red;"></div>`
      );
      $div();
    });
  });

  it('reactivity', async () => {
    const color = { value: 'red' };
    let el: HopeElement;

    comWithSlot(() => {
      div({ style: () => ({ color: color.value }) });
      el = getCurrentElement()!;
      expect(el?.outerHTML).toBe(`<div style="color: red;"></div>`);
      $div();
    });

    color.value = 'blue';
    refresh();
    await nextTick();
    //@ts-ignore
    expect(el?.outerHTML).toBe(`<div style="color: blue;"></div>`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;

    comWithSlot(() => {
      hIf(
        () => true,
        () => {
          div({ style: () => ({ color: 'red' }) });
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
      div({ style: { color: 'red' } });
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
