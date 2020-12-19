import { reactive } from '@hopejs/reactivity';
import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { delay, LIFECYCLE_KEYS } from '@hopejs/shared';
import { hShow, mount, div$, div$$, block } from '../../src';

describe('hShow', () => {
  it('basic', async () => {
    div$();
    hShow(true);
    div$$();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(`<div></div>`);

    div$();
    hShow(false);
    div$$();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(`<!--hShow-->`);
  });

  it('reactivity', async () => {
    const show = reactive({ value: true });

    div$();
    hShow(() => show.value);
    div$$();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(`<div></div>`);

    show.value = false;
    await nextTick();
    expect(container.innerHTML).toBe(`<!--hShow-->`);
  });

  it('nest element', async () => {
    const show = reactive({ value: false });

    div$();
    hShow(() => show.value);
    div$();
    div$$();
    div$$();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(`<!--hShow-->`);

    show.value = true;
    await nextTick();
    expect(container.innerHTML).toBe(`<div><div></div></div>`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    block(() => {
      div$();
      hShow(() => true);
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
      hShow(true);
      el = getCurrentElement()!;
      div$$();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
