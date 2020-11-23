import { setAttribute } from '@hopejs/renderer';
import {
  getCurrentElement,
  queueJob,
  collectEffects,
  getLifecycleHandlers,
  callUpdated,
} from '@hopejs/runtime-core';
import { isFunction, normalizeClass } from '@hopejs/shared';
import { effect } from '@hopejs/reactivity';
import { outsideWarn } from './outsideWarn';

type ClassObject = Record<string, any>;
type ClassArray = (string | ClassObject)[];

export function hClass(value: ClassArray | (() => ClassArray)): void;
export function hClass(value: ClassObject | (() => ClassObject)): void;
export function hClass(value: string | (() => string)): void;
export function hClass(value: any) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      const ef = effect(
        () => {
          setAttribute(
            currentElement,
            'class',
            normalizeClass(value()) || undefined
          );
          updatedHandlers && callUpdated(updatedHandlers);
        },
        { scheduler: queueJob }
      );
      collectEffects(ef);
    } else {
      setAttribute(currentElement, 'class', normalizeClass(value) || undefined);
    }
  } else {
    outsideWarn('hClass');
  }
}
