import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { h, hFor, nextTick, render } from '@/api';

describe('hFor', () => {
  it('basic', () => {
    const { fragment } = render(() => {
      hFor([1, 2, 3], (key, value) => {
        key(value);
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
          (key, value) => {
            key(value);
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
        hFor(
          () => list,
          (key, value) => {
            key(value.text);
            h.div(() => value.text);
            currentScope = getCurrentScope()!;
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
});
