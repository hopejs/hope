import { setAttribute } from '@hopejs/renderer';
import { start, end, getCurrentElement } from '@hopejs/runtime-core';
import { Attrs } from './directives/hAttr';

export type QueueAddScope = Function[];

let queueAddScope: QueueAddScope | undefined;

// TODO: 支持 attr

export function div(attr?: Attrs) {
  start('div');
  addScopeId();
}

export function $div() {
  end();
}

export function span(attr?: Attrs) {
  start('span');
  addScopeId();
}

export function $span() {
  end();
}

export function setQueueAddScope(value: QueueAddScope | undefined) {
  queueAddScope = value;
}

function addScopeId() {
  if (!queueAddScope) return;
  const el = getCurrentElement();
  // 添加到一个队列，延迟执行，目的是为了在定义组件时
  // style 函数可以在组件中的任何位置使用。
  queueAddScope.push((scopeId: string) => {
    scopeId && setAttribute(el!, scopeId, '');
  });
}
