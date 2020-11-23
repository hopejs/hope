import { setAttribute } from '@hopejs/renderer';
import {
  StaticAttr,
  start,
  end,
  getCurrentElement,
} from '@hopejs/runtime-core';

export type ComponentScopeId = {
  _queueAddScope: Function[];
};

let componentScopeId: ComponentScopeId | undefined;

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

export function setComponentScopeId(value: ComponentScopeId | undefined) {
  componentScopeId = value;
}

function addScopeId() {
  if (!componentScopeId) return;
  const el = getCurrentElement();
  // 添加到一个队列，延迟执行，目的是为了在定义组件时
  // style 函数可以在组件中的任何位置使用。
  componentScopeId._queueAddScope.push((scopeId: string) => {
    scopeId && setAttribute(el!, scopeId, '');
  });
}
