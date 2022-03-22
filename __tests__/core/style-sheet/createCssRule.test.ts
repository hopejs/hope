import { createCssRule } from '@/core';

describe('createCssRule', () => {
  const cid = 'cid-createCssRule';

  it('basic', () => {
    const cssRule = createCssRule('.class-name', '{}', cid);
    expect(cssRule!.cssText).toBe('.class-name {}');
  });
});
