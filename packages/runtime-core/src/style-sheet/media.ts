import { createCssRule, resetGroup, setGroup } from './createCssRule';
import { getStyleSheet } from './getStyleSheet';

export function media(
  componentId: string,
  condition: string,
  block: () => void
) {
  setGroup(getStyleSheet(componentId));
  const mediaRule = createCssRule('@media' + condition, '{}') as CSSMediaRule;
  setGroup(mediaRule);
  block();
  resetGroup();
  return mediaRule;
}
