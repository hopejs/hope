import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { getCurrentElement, h, hFor, nextTick, render } from '@/api';
import { renderWithoutBlock } from '@/api/hFor';

describe('hFor', () => {
  it('basic', () => {
    const { fragment } = render(() => {
      hFor([1, 2, 3], (value) => {
        h.div(value);
      });
    });

    expect(fragment.childElementCount).toBe(3);
    expect(fragment.children[0].innerHTML).toBe('1');
    expect(fragment.children[1].innerHTML).toBe('2');
    expect(fragment.children[2].innerHTML).toBe('3');
  });

  it('activity', async () => {
    let list = [1, 2, 3];
    const { fragment } = render(() => {
      makeScopeTree(() => {
        hFor(
          () => list,
          (value) => {
            h.div(value);
            refresh(getCurrentScope()!);
          }
        );
      });
    });

    expect(fragment.childElementCount).toBe(3);
    expect(fragment.children[0].innerHTML).toBe('1');
    expect(fragment.children[1].innerHTML).toBe('2');
    expect(fragment.children[2].innerHTML).toBe('3');

    list = [4];
    await nextTick();
    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].innerHTML).toBe('4');
  });

  it('activity after list updated', async () => {
    let list = [{ text: 1 }];
    let currentScope;
    const { fragment } = render(() => {
      makeScopeTree(() => {
        currentScope = getCurrentScope()!;
        hFor(
          () => list,
          (value) => {
            h.div(() => value.text);
          }
        );
      });
    });

    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].innerHTML).toBe('1');

    list = [{ text: 2 }];
    // @ts-ignore
    refresh(currentScope);
    await nextTick();
    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].innerHTML).toBe('2');

    list[0].text = 3;
    // @ts-ignore
    refresh(currentScope);
    await nextTick();
    expect(fragment.childElementCount).toBe(1);
    expect(fragment.children[0].innerHTML).toBe('3');
  });

  it('Empty at the beginning', async () => {
    let list: any[] = [];
    let currentScope: any;
    let container: any;
    render(() => {
      h.div(() => {
        container = getCurrentElement();
        makeScopeTree(() => {
          currentScope = getCurrentScope()!;
          hFor(
            () => list,
            (value) => {
              h.div(value);
            }
          );
        });
      });
    });

    expect(container.childElementCount).toBe(0);

    list = [1];
    refresh(currentScope);
    await nextTick();
    expect(container.childElementCount).toBe(1);
    expect(container.children[0].innerHTML).toBe('1');
  });

  it('renderWithoutBlock', async () => {
    let list: any[] = [1];
    let currentScope: any;
    let container: any;
    renderWithoutBlock(() => {
      h.div(() => {
        container = getCurrentElement();
        makeScopeTree(() => {
          currentScope = getCurrentScope()!;
          hFor(
            () => list,
            (value) => {
              h.div(value);
            }
          );
        });
      });
    });

    expect(container.childElementCount).toBe(0);

    list = [1, 2];
    refresh(currentScope);
    await nextTick();
    expect(container.childElementCount).toBe(0);
    expect(container.outerHTML).toBe('<div></div>');
  });
});
