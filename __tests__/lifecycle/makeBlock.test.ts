import { render } from '@/html';
import { getFragment } from '@/html/h';
import { getCurrentBlock, makeBlockTree } from '@/lifecycle/makeBlockTree';

describe('makeBlock', () => {
  it('basic', () => {
    let block: any;
    function foo() {
      makeBlockTree(() => {
        block = getCurrentBlock();
        expect(block?.start).toBe(getFragment()!.firstChild);
        expect(getFragment()!.firstChild?.textContent).toBe(`block start`);
        expect(getFragment()!.childNodes.length).toBe(2);
      });
    }

    const { fragment } = render(foo);

    expect(block?.end).toBe(fragment.lastChild);
    expect(getCurrentBlock()).toBe(null);
    expect(fragment.lastChild?.textContent).toBe(`block end`);
    expect(fragment.childNodes.length).toBe(2);
  });
});
