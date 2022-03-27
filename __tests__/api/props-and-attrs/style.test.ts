import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { div, $div, defineComponent } from '@/api';
import { refresh } from '@/core/scheduler';

describe('style', () => {
  it('basic', () => {
    const [com, $com] = defineComponent(() => {
      div({ style: { color: 'red' } });
      const el = getCurrentElement();
      expect(el?.outerHTML).toBe(`<div style="color: red;"></div>`);
      $div();
    });

    com();
    $com();
  });

  it('array', () => {
    const [com, $com] = defineComponent(() => {
      const obj1 = { color: 'red' };
      const obj2 = { backgroundColor: 'red' };
      div({ style: [obj1, obj2] });
      const el = getCurrentElement();
      expect(el?.outerHTML).toBe(
        `<div style="color: red; background-color: red;"></div>`
      );
      $div();
    });

    com();
    $com();
  });

  it('reactivity', async () => {
    const [com, $com] = defineComponent(async () => {
      const color = { value: 'red' };

      div({ style: () => ({ color: color.value }) });
      const el = getCurrentElement();
      expect(el?.outerHTML).toBe(`<div style="color: red;"></div>`);
      $div();

      color.value = 'blue';
      refresh();
      await nextTick();
      expect(el?.outerHTML).toBe(`<div style="color: blue;"></div>`);
    });

    com();
    $com();
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
