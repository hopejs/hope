import { nextTick } from '@/core';
import { delay } from '@/shared';
import { hShow, mount, div, $div } from '@/api';

describe('hShow', () => {
  it('basic', async () => {
    div();
    hShow(true);
    $div();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(`<div></div>`);

    div();
    hShow(false);
    $div();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(`<!--hShow-->`);
  });

  it('reactivity', async () => {
    const show = { value: true };

    div();
    hShow(() => show.value);
    $div();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(`<div></div>`);

    show.value = false;
    await nextTick();
    expect(container.innerHTML).toBe(`<!--hShow-->`);
  });

  it('nest element', async () => {
    const show = { value: false };

    div();
    hShow(() => show.value);
    div();
    $div();
    $div();
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
    div();
    hShow(() => true);
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;
    div();
    hShow(true);
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
