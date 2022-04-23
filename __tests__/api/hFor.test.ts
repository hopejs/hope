import {
  getCurrentScope,
  makeScopeTree,
  ScopeTree,
} from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { h, hFor, nextTick, render } from '@/api';

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
    let scope: ScopeTree;
    const { fragment } = render(() => {
      makeScopeTree(() => {
        scope = getCurrentScope()!;
        hFor(
          () => list,
          (value) => {
            h.div(value);
          }
        );
      });
    });

    expect(fragment.childElementCount).toBe(3);
    expect(fragment.children[0].innerHTML).toBe('1');
    expect(fragment.children[1].innerHTML).toBe('2');
    expect(fragment.children[2].innerHTML).toBe('3');

    list = [4];
    refresh(scope!);
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
});
