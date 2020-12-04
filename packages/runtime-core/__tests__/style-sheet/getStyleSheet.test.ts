import { deleteStyleElement, getStyleElement, getStyleSheet } from '../../src';

describe('getStyleSheet', () => {
  it('basic', () => {
    const cid1 = 'cid-getStyleSheet-1';
    const sheet1 = getStyleSheet(cid1);
    expect(sheet1).toBe(getStyleSheet(cid1));

    const cid2 = 'cid-getStyleSheet-2';
    const sheet2 = getStyleSheet(cid2);
    expect(sheet1).not.toBe(sheet2);

    expect(getStyleElement(cid1)!.sheet).toBe(sheet1);
    expect(getStyleElement(cid2)!.sheet).toBe(sheet2);

    deleteStyleElement(cid1);
    expect(getStyleElement(cid1)).toBe(undefined);

    // 删除之后再获取会重新生成一个新的
    const sheet3 = getStyleSheet(cid1);
    expect(sheet3).not.toBe(sheet1);
  });
});
