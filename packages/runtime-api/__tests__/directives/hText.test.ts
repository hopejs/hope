import { reactive } from '@hopejs/reactivity';
import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { LIFECYCLE_KEYS } from '@hopejs/shared';
import { div$, div$$, hText, block } from '../../src';

describe('hText', () => {
  it('basic', () => {
    div$();
    hText('text');
    expect(getCurrentElement()?.innerHTML).toBe(`text`);
    div$$();
  });

  it('reactivity', async () => {
    const content = reactive({ value: 'text' });

    div$();
    hText(() => content.value);
    const el = getCurrentElement();
    div$$();

    expect(el?.innerHTML).toBe(`text`);
    content.value = '123';
    await nextTick();
    expect(el?.innerHTML).toBe(`123`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div$();
      hText(() => 'text');
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
      hText('text');
      el = getCurrentElement()!;
      div$$();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
