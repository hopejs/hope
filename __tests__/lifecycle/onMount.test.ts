import { nextTick } from '@/api';
import { h, render } from '@/html';
import { onMount } from '@/lifecycle/onMount';
import { createElement } from '@/renderer';

describe('onMount', () => {
  it('basic', async () => {
    const handler = jest.fn();
    render(() => {
      h.div(() => onMount(handler));
    }, createElement('div', false));

    expect(handler).toBeCalledTimes(0);

    await nextTick();
    expect(handler).toBeCalledTimes(1);
  });
});
