import { render } from '@/html';
import { getRoot } from '@/html/makeRenderTree';
import { getCurrentBlock, makeBlockTree } from '@/lifecycle/makeBlockTree';
import { createElement } from '@/renderer';

describe('makeBlock', () => {
  it('basic', () => {
    let block: any;
    const root = createElement('div', false);
    function foo() {
      makeBlockTree(() => {
        block = getCurrentBlock();
        expect(block?.start).toBe(getRoot()!.firstChild);
        expect(getRoot()!.firstChild?.textContent).toBe(`block start`);
        expect(getRoot()!.childNodes.length).toBe(2);
      });
    }

    render(foo, root);

    expect(block?.end).toBe(root.lastChild);
    expect(getCurrentBlock()).toBe(null);
    expect(root.lastChild?.textContent).toBe(`block end`);
    expect(root.childNodes.length).toBe(2);
  });
});
