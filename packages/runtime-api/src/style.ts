import {
  createCssRule,
  queueJob,
  keyframes as keyframesFromCore,
  media as mediaFromCore,
} from '@hopejs/runtime-core';
import { addScopeForSelector, isFunction, logWarn } from '@hopejs/shared';
import { effect, stop } from '@hopejs/reactivity';
import { onUnmounted } from './lifecycle';
import {
  getComponentInstanceCount,
  getCurrentCid,
  getCurrentDsid,
  setHasDynamic,
  setHasStatic,
} from './defineComponent';

let isKeyframes = false;

export function addCssRule(
  selector: string,
  style: Partial<CSSStyleDeclaration>
) {
  const componentId = getCurrentCid();

  if (!componentId) {
    logWarn('addCssRule 函数只能在组件中使用，若要设置全局样式请使用普通 css');
    return;
  }

  if (isDynamic(style)) {
    setHasDynamic(true);
    selector = addScopeForSelector(selector, getCurrentDsid()!);
  } else {
    // 静态样式只需要生成一次就行了，相同组件的不同实例
    // 共享相同的静态样式
    if (getComponentInstanceCount(componentId) >= 1 && !isKeyframes) {
      return;
    }
    setHasStatic(true);
    selector = addScopeForSelector(selector, componentId);
  }

  const cssRule = createCssRule(selector, '{}', componentId);
  if (cssRule) {
    setCssRule(cssRule as any, style);
  }
}

export function keyframes(block: () => void) {
  const componentId = getCurrentCid();
  if (componentId) {
    isKeyframes = true;
    const key = keyframesFromCore(componentId, block);
    isKeyframes = false;
    return key;
  }
  logWarn('keyframes 函数只能在组件中使用，若要设置全局样式请使用普通 css');
  return '';
}

export function media(condition: string, block: () => void) {
  const componentId = getCurrentCid();
  if (componentId) {
    const mediaRule = mediaFromCore(componentId, condition, block);
    // 因为静态样式只会添加一次，如果 media 中只有静态样式的话
    // 则除了第一次正常之外，其余的 media 规则中的 cssRule 个数
    // 都是 0。
    if (mediaRule.cssRules.length === 0) {
      deleteCssRule(mediaRule);
    }
    return;
  }
  logWarn('media 函数只能在组件中使用，若要设置全局样式请使用普通 css');
}

function isDynamic(style: Partial<CSSStyleDeclaration>) {
  const keys = Object.keys(style);
  for (let i = 0; i < keys.length; i++) {
    if (isFunction(style[keys[i] as any])) {
      return true;
    }
  }
  return false;
}

function setCssRule(
  cssRule: CSSStyleRule | CSSKeyframeRule,
  style: Partial<CSSStyleDeclaration>
) {
  const cssRuleStyle = cssRule.style;
  Object.keys(style).forEach((key) => {
    const value = style[key as any];
    let ef: any;
    if (!value) return;
    if (isFunction(value)) {
      ef = effect(
        () => {
          cssRuleStyle[key as any] = value();
        },
        { scheduler: queueJob }
      );
    } else {
      cssRuleStyle[key as any] = value;
    }
    onUnmounted(() => {
      ef && stop(ef);
    });
  });
  onUnmounted(() => {
    deleteCssRule(cssRule);
  })
}

function deleteCssRule(cssRule: CSSStyleRule | CSSKeyframeRule | CSSMediaRule) {
  while (cssRule.parentRule) {
    cssRule = cssRule.parentRule as any;
  }
  const styleSheet = cssRule.parentStyleSheet;
  if (styleSheet) {
    styleSheet.deleteRule(getIndex(cssRule, styleSheet.cssRules));
  }
}

function getIndex(
  cssRule: CSSStyleRule | CSSKeyframeRule | CSSMediaRule,
  cssRules: CSSRuleList
) {
  let lenght = cssRules.length;
  while (lenght--) {
    if (cssRules[lenght] === cssRule) {
      return lenght;
    }
  }
  return -1;
}
