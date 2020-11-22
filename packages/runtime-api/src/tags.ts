import { setAttribute } from '@hopejs/renderer/src';
import {
  StaticAttr,
  start,
  end,
  getCurrentElement,
} from '@hopejs/runtime-core';
import { getCurrentComponentScopeId } from './defineComponent';

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
  const el = getCurrentElement();
  // 添加到一个队列，延迟执行，目的是为了在定义组件时
  // style 函数可以在组件中的任何位置使用。
  getCurrentComponentScopeId()?._queueAddScope.push((scopeId: string) => {
    scopeId && setAttribute(el!, scopeId, '');
  });
}
