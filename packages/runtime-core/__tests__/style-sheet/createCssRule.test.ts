import { createCssRule } from '../../src';

describe('createCssRule', () => {
  const cid = 'cid-createCssRule';

  it('basic', () => {
    const cssRule = createCssRule('.class-name', '{}', cid);
    expect(cssRule!.cssText).toBe('.class-name {}');
  });
});
