import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { getCurrentElement, h, hFor, nextTick, render } from '@/api';
import { renderWithoutBlock } from '@/api/hFor';
import { DynamicFlags } from '@/html/makeRenderTree';

describe('hFor', () => {
  it('basic', () => {
    const { fragment } = render(() => {
      hFor([1, 2, 3], (value) => {
        h.div(() => value);
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
            h.div(() => value);
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

  it('renderWithoutBlock', async () => {
    let container: any;
    renderWithoutBlock(() => {
      h.div(
        {
          class: () => 'class',
          style: { color: () => 'red' },
          id: () => 'id',
          onClick: () => {},
          attr: () => 'attr',
        },
        () => 'text'
      );
      container = getCurrentElement();
    });

    expect(container._flag).toBe(
      DynamicFlags.TEXT |
        DynamicFlags.ATTR |
        DynamicFlags.CLASS |
        DynamicFlags.EVENT |
        DynamicFlags.PROP |
        DynamicFlags.STYLE |
        DynamicFlags.TEXT
    );
  });

  it('benchmark example', () => {
    let rows = [{ id: 1, label: 'label' }];
    // let currentScope: any;
    let container: any;

    render(() => {
      h.div(() => {
        makeScopeTree(() => {
          // currentScope = getCurrentScope()!;
          h.tbody(() => {
            container = getCurrentElement();
            hFor(
              () => rows,
              (row) => {
                h.tr({ class: 'danger' }, () => {
                  h.td({ class: 'col-md-1' }, row.id);
                  h.td({ class: 'col-md-4' }, () => {
                    h.a(() => row.label);
                  });
                  h.td({ class: 'col-md-1' }, () => {
                    h.a(() => {
                      h.span({
                        class: 'glyphicon glyphicon-remove',
                        'aria-hidden': 'true',
                      });
                    });
                  });
                  h.td({ class: 'col-md-6' });
                });
              }
            );
          });
        });
      });
    });

    expect(container.children.length).toBe(1);
    expect(container.children[0].outerHTML).toBe(
      `<tr class=\"danger\"><td class=\"col-md-1\">1</td><td class=\"col-md-4\"><a>label</a></td><td class=\"col-md-1\"><a><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a></td><td class=\"col-md-6\"></td></tr>`
    );
  });
});
