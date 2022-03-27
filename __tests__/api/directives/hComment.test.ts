import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { hComment, div, $div } from '@/api';
import { LIFECYCLE_KEYS } from '@/shared';

describe('hComment', () => {
  it('basic', () => {
    div();
    hComment('');
    expect(getCurrentElement()?.innerHTML).toBe('<!---->');
    $div();
  });

  it('reactivity', async () => {
    const state = { name: 'a' };

    div();
    hComment(() => state.name);
    const el = getCurrentElement();
    expect(el?.innerHTML).toBe(`<!--a-->`);
    $div();

    state.name = 'b';
    await nextTick();
    expect(el?.innerHTML).toBe(`<!--b-->`);
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
