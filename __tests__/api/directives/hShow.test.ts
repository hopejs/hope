import { nextTick } from '@/core';
import { delay } from '@/shared';
import { hShow, mount, div, $div, defineComponent } from '@/api';
import { refresh } from '@/core/scheduler';

describe('hShow', () => {
  it('basic', async () => {
    const [com, $com] = defineComponent<{ show: boolean }>(({ props }) => {
      div();
      hShow(props.show);
      $div();
    });

    com({ show: true });
    $com();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div></div><!--component end-->`
    );

    com({ show: false });
    $com();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--hShow--><!--component end-->`
    );
  });

  it('reactivity', async () => {
    let show = true;

    const [com, $com] = defineComponent<{ show: boolean }>(({ props }) => {
      div();
      hShow(() => props.show);
      $div();
    });

    com({ show: () => show });
    $com();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div></div><!--component end-->`
    );

    show = false;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--hShow--><!--component end-->`
    );
  });

  it('nest element', async () => {
    let show = false;

    const [com, $com] = defineComponent<{ show: boolean }>(({ props }) => {
      div();
      hShow(() => props.show);
      div();
      $div();
      $div();
    });

    com({ show: () => show });
    $com();
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--hShow--><!--component end-->`
    );

    show = true;
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><div><div></div></div><!--component end-->`
    );
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
