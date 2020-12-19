import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import { hComment, div$, div$$, block } from '../../src';
import { LIFECYCLE_KEYS } from '@hopejs/shared';

describe('hComment', () => {
  it('basic', () => {
    div$();
    hComment('');
    expect(getCurrentElement()?.innerHTML).toBe('<!---->');
    div$$();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div$();
    hComment(() => state.name);
    const el = getCurrentElement();
    expect(el?.innerHTML).toBe(`<!--a-->`);
    div$$();

    state.name = 'b';
    await nextTick();
    expect(el?.innerHTML).toBe(`<!--b-->`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div$();
      hComment(() => 'name');
      el = getCurrentElement()!;
      div$$();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;
    block(() => {
      div$();
      hComment('name');
      el = getCurrentElement()!;
      div$$();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
