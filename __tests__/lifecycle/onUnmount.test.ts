import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { h, hIf, nextTick, render } from '@/api';
import { onUnmount } from '@/lifecycle/onUnmount';
import { createElement } from '@/renderer/render';

describe('onUnmount', () => {
  it('basic', async () => {
    let show = true;
    const handler = jest.fn();
    render(() => {
      makeScopeTree(() => {
        hIf(
          () => show,
          () => {
            h.div(() => {
              onUnmount(handler);
              refresh(getCurrentScope()!);
            });
          }
        );
      });
    }, createElement('div', false));

    expect(handler).toBeCalledTimes(0);

    show = false;
    await nextTick();
    expect(handler).toBeCalledTimes(1);
  });
});
