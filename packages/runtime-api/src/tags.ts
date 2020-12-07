import { start, end, addScopeId } from '@hopejs/runtime-core';
import { Attrs, hAttr } from './directives/hAttr';

export const [div, $div] = makeTag('div');
export const [span, $span] = makeTag('span');

function makeTag(tagName: any): [(attrs?: Attrs) => void, () => void] {
  return [
    (attrs?: Attrs) => {
      start(tagName);
      attrs && hAttr(attrs);
      addScopeId();
    },
    end,
  ];
}
