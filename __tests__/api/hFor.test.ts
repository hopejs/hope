import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { getCurrentElement, h, hFor, nextTick, render } from '@/api';
import { renderWithoutBlock } from '@/api/hFor';
import { DynamicFlags, HostElement } from '@/html/makeRenderTree';
import { createElement } from '@/renderer';

describe('hFor', () => {
  it('basic', () => {
    const container = createElement('div', false);
    render(() => {
      hFor([1, 2, 3], (value) => {
        h.div(() => value);
      });
    }, container);

    expect(container.childElementCount).toBe(3);
    expect(container.children[0].innerHTML).toBe('1');
    expect(container.children[1].innerHTML).toBe('2');
    expect(container.children[2].innerHTML).toBe('3');
  });

  it('activity', async () => {
    const container = createElement('div', false);
    let list = [1, 2, 3];
    render(() => {
      makeScopeTree(() => {
        hFor(
          () => list,
          (value) => {
            h.div(() => value);
            refresh(getCurrentScope()!);
          }
        );
      });
    }, container);

    expect(container.childElementCount).toBe(3);
    expect(container.children[0].innerHTML).toBe('1');
    expect(container.children[1].innerHTML).toBe('2');
    expect(container.children[2].innerHTML).toBe('3');

    list = [4];
    await nextTick();
    expect(container.childElementCount).toBe(1);
    expect(container.children[0].innerHTML).toBe('4');
  });

  it('activity after list updated', async () => {
    const container = createElement('div', false);
    let list = [{ text: 1 }];
    let currentScope;
    render(() => {
      makeScopeTree(() => {
        currentScope = getCurrentScope()!;
        hFor(
          () => list,
          (value) => {
            h.div(() => value.text);
          }
        );
      });
    }, container);

    expect(container.childElementCount).toBe(1);
    expect(container.children[0].innerHTML).toBe('1');

    list = [{ text: 2 }];
    // @ts-ignore
    refresh(currentScope);
    await nextTick();
    expect(container.childElementCount).toBe(1);
    expect(container.children[0].innerHTML).toBe('2');

    list[0].text = 3;
    // @ts-ignore
    refresh(currentScope);
    await nextTick();
    expect(container.childElementCount).toBe(1);
    expect(container.children[0].innerHTML).toBe('3');
  });

  it('Empty at the beginning', async () => {
    let list: any[] = [];
    let currentScope: any;
    let div: any;
    const container = createElement('div', false);
    render(() => {
      h.div(() => {
        div = getCurrentElement();
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
    }, container);

    expect(div.childElementCount).toBe(0);

    list = [1];
    refresh(currentScope);
    await nextTick();
    expect(div.childElementCount).toBe(1);
    expect(div.children[0].innerHTML).toBe('1');
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
    let span: HostElement;
    let div: HostElement;
    renderWithoutBlock(() => {
      h.div(() => {
        container = getCurrentElement();
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
        div = getCurrentElement()!;
        h.span('nothing');
        span = getCurrentElement()!;
      });
    });

    expect(container._fc).toBe(div!);
    expect(container._fc._ns).toBe(span!);
    expect(container._lc).toBe(span!);
    expect(div!._pn).toBe(container);
    expect(span!._pn).toBe(container);

    expect(container._f).toBe(DynamicFlags.CHILDREN);
    expect(container.firstChild._f).toBe(
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
    let tbody: any;
    const container = createElement('div', false);

    render(() => {
      h.div(() => {
        makeScopeTree(() => {
          // currentScope = getCurrentScope()!;
          h.tbody(() => {
            tbody = getCurrentElement();
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
    }, container);

    expect(tbody.children.length).toBe(1);
    expect(tbody.children[0].outerHTML).toBe(
      `<tr class=\"danger\"><td class=\"col-md-1\">1</td><td class=\"col-md-4\"><a>label</a></td><td class=\"col-md-1\"><a><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a></td><td class=\"col-md-6\"></td></tr>`
    );
  });
});
