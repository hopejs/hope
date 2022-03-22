import { getStyleSheet, nextTick } from '@/core';
import { reactive } from '@/reactivity';
import { defineComponent, s } from '@/api';
import { getCurrentCid } from '@/api/defineComponent';

describe('style', () => {
  const common = (number: number, block: () => void) => {
    let componentId: string;
    const [com, $com] = defineComponent(() => {
      componentId = getCurrentCid()!;
      block();
    });

    while (number--) {
      com();
      $com();
    }

    // @ts-ignore
    return getStyleSheet(componentId)!;
  };

  it('basic & addCssRule', () => {
    const sheet = common(1, () => {
      s('.class-name-1', {
        color: 'red',
      });

      // 动态样式
      s('.class-name-2', {
        color: () => 'red',
      });
    });

    expect(sheet.cssRules.length).toBe(2);
    expect(sheet.cssRules[0].cssText).toBe(
      '.class-name-1[h-cid-1] {color: red;}'
    );
    // @ts-ignore
    expect(sheet.cssRules[1].style.color).toBe('red');
  });

  it('multiple & addCssRule', () => {
    const sheet = common(2, () => {
      s('.class-name-1', {
        color: 'red',
      });

      // 动态样式
      s('.class-name-2', {
        color: () => 'red',
      });
    });

    expect(sheet.cssRules.length).toBe(3);
    expect(sheet.cssRules[0].cssText).toBe(
      '.class-name-1[h-cid-2] {color: red;}'
    );
    // @ts-ignore
    expect(sheet.cssRules[1].selectorText).toBe('.class-name-2[h-dsid-2]');
    // @ts-ignore
    expect(sheet.cssRules[1].style.color).toBe('red');
    // @ts-ignore
    expect(sheet.cssRules[2].selectorText).toBe('.class-name-2[h-dsid-3]');
    // @ts-ignore
    expect(sheet.cssRules[2].style.color).toBe('red');
  });

  it('reactivity & addCssRule', async () => {
    const state = reactive({ color: 'red' });
    const sheet = common(1, () => {
      s('.class-name', {
        backgroundColor: () => state.color,
      });
    });

    // @ts-ignore
    expect(sheet.cssRules[0].style.backgroundColor).toBe('red');

    state.color = 'blue';
    await nextTick();
    // @ts-ignore
    expect(sheet.cssRules[0].style.backgroundColor).toBe('blue');
  });
});

// TODO: 测试 CSSMediaRule 和 CSSKeyframesRule
// 目前 jest 的 jsdom 中的 CSSOM 模块还不支持 CSSGroupingRule API
