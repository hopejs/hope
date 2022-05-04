import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { h, hIf, nextTick, render } from '@/api';
import { createElement } from '@/renderer';

describe('hIf', () => {
  it('basic', () => {
    const root = createElement('div', false);
    render(() => {
      hIf(true, () => {
        h.div();
      });
    }, root);

    expect(root.childElementCount).toBe(1);
    expect(root.children[0].outerHTML).toBe('<div></div>');
  });

  it('activity', async () => {
    let cond = true;
    let currentScope: any;
    const root = createElement('div', false);
    render(() => {
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
    }, root);

    expect(root.childElementCount).toBe(1);
    expect(root.children[0].outerHTML).toBe('<div>true</div>');

    cond = false;
    refresh(currentScope);
    await nextTick();
    expect(root.childElementCount).toBe(1);
    expect(root.children[0].outerHTML).toBe('<span>false</span>');
  });
});
