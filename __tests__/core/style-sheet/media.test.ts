import { createCssRule, getStyleSheet, media } from '@/core';

describe('media', () => {
  it('basic', () => {
    const cid = 'cid-media';
    const sheet = getStyleSheet(cid);
    const mediaRule = media(cid, '(max-width: 100px)', () => {
      expect(sheet!.cssRules[sheet!.cssRules.length - 1].cssText).toBe(
        '@media (max-width: 100px) {}'
      );
    });

    expect(mediaRule.cssText).toBe('@media (max-width: 100px) {}');

    // 在 media 外面创建 rule 应该添加到外层的 sheet 中
    const cssRule = createCssRule('.class-name', '{}', cid);
    expect(sheet!.cssRules[sheet!.cssRules.length - 1]).toBe(cssRule);
  });
});
