import { nextTick } from '@/api';
import { h, mount, render } from '@/html';
import { onMount } from '@/lifecycle/onMount';
import { createElement } from '@/renderer';

describe('onMount', () => {
  it('basic', async () => {
    const handler = jest.fn();
    const result = render(() => {
      h.div(() => onMount(handler));
    });

    expect(handler).toBeCalledTimes(0);

    mount(result, createElement('div', false));
    await nextTick();
    expect(handler).toBeCalledTimes(1);
  });
});
