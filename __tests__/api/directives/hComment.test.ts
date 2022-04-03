import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { hComment, div, $div } from '@/api';
import { refresh } from '@/core/scheduler';
import { LIFECYCLE_KEYS } from '@/shared';
import { hIf } from '@/api/directives/hIf';
import { comWithSlot } from '../../common';

describe('hComment', () => {
  it('basic', () => {
    comWithSlot(() => {
      div();
      hComment('');
      expect(getCurrentElement()?.innerHTML).toBe('<!---->');
      $div();
    });
  });

  it('reactivity', async () => {
    const state = { name: 'a' };
    let el: HopeElement;

    comWithSlot(() => {
      div();
      hComment(() => state.name);
      el = getCurrentElement()!;
      expect(el?.innerHTML).toBe(`<!--a-->`);
      $div();
    });

    state.name = 'b';
    refresh();
    await nextTick();
    expect(el!?.innerHTML).toBe(`<!--b-->`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;

    comWithSlot(() => {
      hIf(
        () => true,
        () => {
          div();
          hComment(() => 'name');
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
      div();
      hComment('name');
      el = getCurrentElement()!;
      $div();
    })

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
