import { render } from '@/html';
import { getFragment } from '@/html/h';
import { getCurrentBlock, makeBlock } from '@/lifecycle/makeBlock';

describe('makeBlock', () => {
  it('basic', () => {
    let block: any;
    function foo() {
      makeBlock(() => {
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
