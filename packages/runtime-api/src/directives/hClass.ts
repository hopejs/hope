import { setAttribute } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import {
  forEachObj,
  isArray,
  isDynamic,
  isFunction,
  isObject,
  normalizeClass,
} from '@hopejs/shared';
import { autoUpdate } from '../autoUpdate';

type ClassObject = Record<string, any>;
type ClassArray = (string | ClassObject)[];

export function hClass(value: ClassArray | (() => ClassArray)): void;
export function hClass(value: ClassObject | (() => ClassObject)): void;
export function hClass(value: string | (() => string)): void;
export function hClass(value: any) {
  const currentElement = getCurrentElement();
  if (isDynamic(value)) {
    autoUpdate(() =>
      setAttribute(
        currentElement!,
        'class',
        normalizeClass(getStaticVersion(isFunction(value) ? value() : value)) ||
          undefined
      )
    );
  } else {
    setAttribute(currentElement!, 'class', normalizeClass(value) || undefined);
  }
}

function getStaticVersion(obj: any): any {
  if (isArray(obj)) return obj.map((item) => getStaticVersion(item));
  if (isObject(obj)) {
    const result: any = {};
    forEachObj(obj, (value, key) => {
      if (isFunction(value)) {
        result[key] = value();
      } else {
        result[key] = value;
      }
    });
    return result;
  }
  return obj;
}
