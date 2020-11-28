import { setAttribute } from '@hopejs/renderer';
import {
  StaticAttr,
  start,
  end,
  getCurrentElement,
} from '@hopejs/runtime-core';

// 存放添加 scopeId 的函数
export type QueueAddScopeId = Function[];

let queueAddScopeId: QueueAddScopeId | undefined;

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

export function setQueueAddScopeId(value: QueueAddScopeId | undefined) {
  queueAddScopeId = value;
}

function addScopeId() {
  if (!queueAddScopeId) return;
  const el = getCurrentElement();
  // 添加到一个队列，延迟执行，目的是为了在定义组件时
  // style 函数可以在组件中的任何位置使用。
  queueAddScopeId.push((scopeId: string) => {
    scopeId && setAttribute(el!, scopeId, '');
  });
}
