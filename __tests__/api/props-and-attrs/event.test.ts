import { getCurrentElement } from '@/core';
import { delay } from '@/shared';
import { div, $div, defineComponent, mount } from '@/api';

describe('event', () => {
  it('basic', () => {
    const [com, $com] = defineComponent(() => {
      const fn = jest.fn();

      div({ onClick: fn });
      const el = getCurrentElement();
      $div();

      el?.dispatchEvent(new CustomEvent('click'));
      expect(fn).toBeCalledTimes(1);
      el?.dispatchEvent(new CustomEvent('click'));
      expect(fn).toBeCalledTimes(2);
    });

    com();
    $com();
  });

  it('modifier & once', () => {
    const [com, $com] = defineComponent(() => {
      const fn = jest.fn();

      div({ onClick$once: fn });
      const el = getCurrentElement();
      $div();

      el?.dispatchEvent(new CustomEvent('click'));
      expect(fn).toBeCalledTimes(1);
      el?.dispatchEvent(new CustomEvent('click'));
      expect(fn).toBeCalledTimes(1);
    });

    com();
    $com();
  });

  it('modifier & once with component', async () => {
    let el: Element;
    const [person, $person] = defineComponent<any, any>(({ emit }) => {
      div({
        onClick: () => {
          emit && emit('testClick', 123);
        },
      });
      el = getCurrentElement()!;
      $div();
    });

    const fn = jest.fn((arg) => {
      expect(arg).toBe(123);
    });

    person({ onTestClick$once: fn });
    $person();

    const container = document.createElement('div');
    mount(container);
    await delay();

    // @ts-ignore
    el.dispatchEvent(new CustomEvent('click'));
    expect(fn).toBeCalledTimes(1);
    // @ts-ignore
    el.dispatchEvent(new CustomEvent('click'));
    expect(fn).toBeCalledTimes(1);
  });
});
