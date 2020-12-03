import { createCssRule, resetGroup, setGroup } from './createCssRule';
import { getStyleSheet } from './getStyleSheet';

let keyframesId = 0;

export function keyframes(
  componentId: string,
  block: () => void,
  firstName?: string
) {
  const name = firstName || `${componentId}-${keyframesId}`;
  keyframesId++;
  setGroup(getStyleSheet(componentId));
  setGroup(createCssRule(`@keyframes ${name}`, '{}') as CSSKeyframesRule);
  block();
  resetGroup();

  return name;
}
