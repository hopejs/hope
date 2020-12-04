import { createCssRule } from '../../src/style-sheet/createCssRule';

describe('createCssRule', () => {
  const cid = 'cid';

  it('basic', () => {
    const cssRule = createCssRule('.class-name', '{}', cid);
    expect(cssRule!.cssText).toBe('.class-name {}');
  });
});
