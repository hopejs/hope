import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { hComment, div, $div, defineComponent } from '@/api';
import { refresh } from '@/core/scheduler';

describe('hComment', () => {
  it('basic', () => {
    div();
    hComment('');
    expect(getCurrentElement()?.innerHTML).toBe('<!---->');
    $div();
  });

  it('reactivity', async () => {
    const state = { name: 'a' };
    let el: HopeElement;

    const [com, $com] = defineComponent(() => {
      div();
      hComment(() => state.name);
      el = getCurrentElement()!;
      expect(el?.innerHTML).toBe(`<!--a-->`);
      $div();
    });

    com();
    $com();

    state.name = 'b';
    refresh();
    await nextTick();
    expect(el!?.innerHTML).toBe(`<!--b-->`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    div();
    hComment(() => 'name');
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;
    div();
    hComment('name');
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
