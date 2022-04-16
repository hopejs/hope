import { refresh } from '@/activity';
import { getCurrentScope } from '@/activity/makeScope';
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
    const { fragment } = render(() => {
      hFor(
        () => list,
        (value) => {
          h.div(value);
          refresh(getCurrentScope()!);
        }
      );
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
});
