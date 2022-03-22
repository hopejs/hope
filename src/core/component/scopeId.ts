import { setAttribute } from '@/renderer';
import { getCurrentElement } from '../basic';

export type QueueAddScope = Function[];

let queueAddScope: QueueAddScope | undefined;

export function setQueueAddScope(value: QueueAddScope | undefined) {
  queueAddScope = value;
}

export function addScopeId() {
  if (!queueAddScope) return;
  const el = getCurrentElement();
  // 添加到一个队列，延迟执行，目的是为了在定义组件时
  // 样式可以写在组件中的任何位置。
  queueAddScope.push((scopeId: string) => {
    scopeId && setAttribute(el!, scopeId, '');
  });
}
