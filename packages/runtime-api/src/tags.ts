import { StaticAttr, start, end } from '@hopejs/runtime-core';
import { getCurrentCid, getCurrentSid } from './defineComponent';
import { hAttr } from './directives/hAttr';

export function div(attr?: StaticAttr) {
  start('div', attr);
  addScopeId();
}

export function $div() {
  end();
}

export function span(attr?: StaticAttr) {
  start('span', attr);
  addScopeId();
}

export function $span() {
  end();
}

function addScopeId() {
  const cid = getCurrentCid();
  const sid = getCurrentSid();
  cid && hAttr(cid, '');
  sid && hAttr(sid, '');
}
