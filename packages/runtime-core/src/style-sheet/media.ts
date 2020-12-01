import { createCssRule, resetGroup, setGroup } from './createCssRule';
import { getStyleSheet } from './getStyleSheet';

export function media(
  componentId: string,
  condition: string,
  block: () => void
) {
  setGroup(getStyleSheet(componentId));
  setGroup(createCssRule('@media' + condition, '{}') as CSSMediaRule);
  block();
  resetGroup();
}
