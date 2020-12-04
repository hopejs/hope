import {
  createCssRule,
  queueJob,
  keyframes as keyframesFromCore,
  media as mediaFromCore,
} from '@hopejs/runtime-core';
import {
  addScopeForSelector,
  isFunction,
  logWarn,
  stringifyStyle,
} from '@hopejs/shared';
import { effect, stop } from '@hopejs/reactivity';
import { onUnmounted } from './lifecycle';
import {
  getComponentCssRuleId,
  getComponentInstanceCount,
  getCurrentCid,
  getCurrentDsid,
  incrementComponentCssRuleId,
  setHasDynamic,
  setHasStatic,
} from './defineComponent';

const isDynamicOfComponentCssRule: Record<
  string,
  Record<string, boolean | undefined> | undefined
> = {};

const stackGroupId: number[] = [];
let isKeyFrames = false;

export function addCssRule(
  selector: string,
  style: Partial<CSSStyleDeclaration>
) {
  const componentId = getCurrentCid();

  if (!componentId) {
    logWarn('addCssRule 函数只能在组件中使用，若要设置全局样式请使用普通 css');
    return;
  }

  const cssRuleId = getComponentCssRuleId(componentId)!;
  incrementComponentCssRuleId(componentId);

  const isDynamicObj = getCurrentIsDynamicObject(componentId);
  const isDynamicVar = isDynamicObj.hasOwnProperty(cssRuleId)
    ? isDynamicObj[cssRuleId]
    : (isDynamicObj[cssRuleId] = isDynamic(style));

  // 有可能是嵌套 group，比如嵌套的 @media
  stackGroupId.forEach((groupId) => {
    isDynamicObj[groupId] || (isDynamicObj[groupId] = isDynamicVar);
  });

  if (isDynamicVar) {
    setHasDynamic(true);
    selector = addScopeForSelector(selector, getCurrentDsid()!);
    const cssRule = createCssRule(selector, '{}', componentId);
    if (cssRule) {
      setCssRule(cssRule as any, style);
      onUnmounted(() => deleteCssRule(cssRule as any));
    }
  } else {
    // 静态样式只需要生成一次就行了，相同组件的不同实例
    // 共享相同的静态样式。
    // keyframes 情况比较特殊，因为需要包含所有子 rule
    // 才有意义。
    if (getComponentInstanceCount(componentId) >= 1 && !isKeyFrames) {
      return;
    }
    setHasStatic(true);
    selector = addScopeForSelector(selector, componentId);
    createCssRule(selector, `{${stringifyStyle(style as any)}}`, componentId);
  }
}

export function keyframes(block: () => void) {
  let result = '';
  const componentId = getCurrentCid();
  if (!componentId) {
    logWarn('keyframes 函数只能在组件中使用，若要设置全局样式请使用普通 css');
    return result;
  }
  const cssKeyframesRuleId = getComponentCssRuleId(componentId)!;
  incrementComponentCssRuleId(componentId);

  stackGroupId.push(cssKeyframesRuleId);
  const isDynamicObj = getCurrentIsDynamicObject(componentId);
  const firstName = `f-${componentId}-${cssKeyframesRuleId}`;

  isKeyFrames = true;
  if (isDynamicObj.hasOwnProperty(cssKeyframesRuleId)) {
    if (isDynamicObj[cssKeyframesRuleId])
      result = keyframesFromCore(componentId, block);
    else result = firstName;
  } else {
    keyframesFromCore(componentId, block, firstName);
    result = firstName;
  }
  stackGroupId.pop();
  isKeyFrames = false;
  return result;
}

export function media(condition: string, block: () => void) {
  const componentId = getCurrentCid();
  if (!componentId) {
    return logWarn(
      'media 函数只能在组件中使用，若要设置全局样式请使用普通 css'
    );
  }
  const cssMediaRuleId = getComponentCssRuleId(componentId)!;
  incrementComponentCssRuleId(componentId);

  stackGroupId.push(cssMediaRuleId);
  const isDynamicObj = getCurrentIsDynamicObject(componentId);
  if (isDynamicObj.hasOwnProperty(cssMediaRuleId)) {
    isDynamicObj[cssMediaRuleId] &&
      mediaFromCore(componentId, condition, block);
  } else {
    mediaFromCore(componentId, condition, block);
  }
  stackGroupId.pop();
}

function getCurrentIsDynamicObject(componentId: string) {
  return (
    isDynamicOfComponentCssRule[componentId] ||
    (isDynamicOfComponentCssRule[componentId] = {})
  );
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
    if (!value) return;
    if (isFunction(value)) {
      const ef = effect(
        () => {
          cssRuleStyle[key as any] = value();
        },
        { scheduler: queueJob }
      );
      onUnmounted(() => stop(ef));
    } else {
      cssRuleStyle[key as any] = value;
    }
  });
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
