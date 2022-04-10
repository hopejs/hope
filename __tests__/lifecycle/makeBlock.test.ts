import { getFragment } from '@/html';
import { getCurrentBlock, makeBlock } from '@/lifecycle/makeBlock';

describe('makeBlock', () => {
  it('basic', () => {
    let block: any;
    makeBlock(() => {
      block = getCurrentBlock();
      expect(block?.start).toBe(getFragment().firstChild);
      expect(getFragment().firstChild?.textContent).toBe(`block start`);
      expect(getFragment().childNodes.length).toBe(1);
    });

    expect(block?.end).toBe(getFragment().lastChild);
    expect(getCurrentBlock()).toBe(null);
    expect(getFragment().lastChild?.textContent).toBe(`block end`);
    expect(getFragment().childNodes.length).toBe(2);
  });
});
