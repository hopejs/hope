import { setAttribute } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction, normalizeClass } from '@hopejs/shared';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';

type ClassObject = Record<string, any>;
type ClassArray = (string | ClassObject)[];

export function hClass(value: ClassArray | (() => ClassArray)): void;
export function hClass(value: ClassObject | (() => ClassObject)): void;
export function hClass(value: string | (() => string)): void;
export function hClass(value: any) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hClass');

  if (isFunction(value)) {
    autoUpdate(() =>
      setAttribute(
        currentElement!,
        'class',
        normalizeClass(value()) || undefined
      )
    );
  } else {
    setAttribute(currentElement!, 'class', normalizeClass(value) || undefined);
  }
}
