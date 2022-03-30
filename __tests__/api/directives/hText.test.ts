import { getCurrentElement, HopeElement, nextTick } from '@/core';
import { LIFECYCLE_KEYS } from '@/shared';
import { div, $div, hText, defineComponent } from '@/api';
import { refresh } from '@/core/scheduler';
import { hIf } from '@/api/directives/hIf';
import { comWithSlot } from '../../common';

describe('hText', () => {
  it('basic', () => {
    comWithSlot(() => {
      div();
      hText('text');
      expect(getCurrentElement()?.innerHTML).toBe(`text`);
      $div();
    });
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

    comWithSlot(() => {
      hIf(
        () => true,
        () => {
          div();
          hText(() => 'text');
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
      hText('text');
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
