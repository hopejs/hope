import { createCssRule, resetGroup, setGroup } from './createCssRule';

export function media(
  componentId: string,
  condition: string,
  block: () => void
) {
  const mediaRule = createCssRule(
    '@media' + condition,
    '{}',
    componentId
  ) as CSSMediaRule;
  setGroup(mediaRule);
  block();
  resetGroup();
  return mediaRule;
}
