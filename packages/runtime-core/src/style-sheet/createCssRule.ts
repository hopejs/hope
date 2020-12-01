type CssGroup = CSSStyleSheet | CSSMediaRule | CSSKeyframesRule | undefined;

let group: CssGroup;

export function createCssRule(selector: string, style: string) {
  if (!group) return;
  const cssText = selector + style;
  if (group instanceof CSSStyleSheet || group instanceof CSSMediaRule) {
    const lenght = group.cssRules.length;
    group.insertRule(cssText, lenght);
    return group.cssRules[lenght];
  }
  if (group instanceof CSSKeyframesRule) {
    group.appendRule(cssText);
    return group.findRule(selector) as CSSKeyframeRule;
  }
}

export function setGroup(v: CssGroup) {
  group = v;
}

export function resetGroup() {
  group = undefined;
}
