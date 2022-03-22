import { createCssRule, getStyleSheet, keyframes } from '@/core';

describe('keyframes', () => {
  it('basic', () => {
    const cid = 'cid-keyframes';
    const sheet = getStyleSheet(cid);
    const name = 'firstName';
    const keyframesName = keyframes(
      cid,
      () => {
        expect(sheet!.cssRules[sheet!.cssRules.length - 1].cssText).toBe(
          `@keyframes firstName {${' '}

}`
        );
      },
      name
    );

    expect(keyframesName).toBe(name);

    // 在 keyframes 外面创建 rule 应该添加到外层的 sheet 中
    const cssRule = createCssRule('.class-name', '{}', cid);
    expect(sheet!.cssRules[sheet!.cssRules.length - 1]).toBe(cssRule);
  });
});
