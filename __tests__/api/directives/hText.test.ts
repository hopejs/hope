import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { LIFECYCLE_KEYS } from '@/shared';
import { div, $div, hText, defineComponent } from '@/api';
import { refresh } from '@/core/scheduler';

describe('hText', () => {
  it('basic', () => {
    const [com, $com] = defineComponent(() => {
      div();
      hText('text');
      expect(getCurrentElement()?.innerHTML).toBe(`text`);
      $div();
    });

    com();
    $com();
  });

  it('reactivity', async () => {
    let content = 'text';
    let el: HopeElement;
    const [com, $com] = defineComponent<{ text: string }>(({ props }) => {
      div();
      hText(() => props.text);
      el = getCurrentElement()!;
      $div();
    });

    com({ text: () => content });
    $com();

    expect(el!.innerHTML).toBe(`text`);
    content = '123';
    refresh();
    await nextTick();
    expect(el!.innerHTML).toBe(`123`);
  });

  it('elementUnmounted', () => {
    let el: HopeElement;
    div();
    hText(() => 'text');
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it('elementUnmounted & no reactivity', () => {
    let el: HopeElement;
    div();
    hText('text');
    el = getCurrentElement()!;
    $div();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
