import { createCssRule, resetGroup, setGroup } from './createCssRule';

let keyframesId = 0;

export function keyframes(
  componentId: string,
  block: () => void,
  firstName?: string
) {
  const name = firstName || `${componentId}-${keyframesId}`;
  keyframesId++;
  setGroup(
    createCssRule(`@keyframes ${name}`, '{}', componentId) as CSSKeyframesRule
  );
  block();
  resetGroup();

  return name;
}
