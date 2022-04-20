import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { h, hIf, nextTick, render } from '@/api';

describe('hIf', () => {
  it('basic', () => {
    const { fragment } = render(() => {
      hIf(true, () => {
        h.div();
      });
    });

    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].outerHTML).toBe('<div></div>');
  });

  it('activity', async () => {
    let cond = true;
    let currentScope: any;
    const { fragment } = render(() => {
      makeScopeTree(() => {
        hIf(
          () => cond,
          () => {
            h.div('true');
            currentScope = getCurrentScope()!;
          },
          () => {
            h.span('false');
          }
        );
      });
    });

    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].outerHTML).toBe('<div>true</div>');

    cond = false;
    refresh(currentScope);
    await nextTick();
    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].outerHTML).toBe('<span>false</span>');
  });
});
