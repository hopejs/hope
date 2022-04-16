import { refresh } from '@/activity';
import { getCurrentScope } from '@/activity/makeScope';
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
    const { fragment } = render(() => {
      hIf(
        () => cond,
        () => {
          h.div('true');
          refresh(getCurrentScope()!);
        },
        () => {
          h.span('false');
          refresh(getCurrentScope()!);
        }
      );
    });

    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].outerHTML).toBe('<div>true</div>');

    cond = false;
    await nextTick();
    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].outerHTML).toBe('<span>false</span>');
  });
});
