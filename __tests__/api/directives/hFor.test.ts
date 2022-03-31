import { $div, div, hFor, hText, nextTick, refresh } from '@/api';
import { comWithSlot, withMount } from '../../common';

describe('hFor', () => {
  it('basic', async () => {
    comWithSlot(() => {
      hFor(
        () => [1, 2, 3],
        (item) => {
          div();
          hText(String(item));
          $div();
        }
      );
    });

    const container = await withMount();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--block start--><div>1</div><div>2</div><div>3</div><!--block end--><!--component end-->`
    );
  });

  it('Dynamic', async () => {
    let list: number[] = [];
    comWithSlot(() => {
      hFor(
        () => list,
        (item) => {
          div();
          hText(String(item));
          $div();
        }
      );
    });

    const container = await withMount();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--block start--><!--block end--><!--component end-->`
    );

    list = [1];
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><!--block start--><div>1</div><!--block end--><!--component end-->`
    );
  });
});
