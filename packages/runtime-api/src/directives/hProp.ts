import { getComponentProps, getCurrentElement } from '@hopejs/runtime-core';
import { forEachObj, isFunction } from '@hopejs/shared';
import { isReactive } from '@hopejs/reactivity';
import { autoUpdate } from '../autoUpdate';
import { outsideError } from './outsideError';

export type Props<T> = {
  [K in keyof T]?: T[K] | (() => T[K]);
};

export function hProp<K extends keyof HTMLElementTagNameMap>(
  props: Props<HTMLElementTagNameMap[K]>
): void;
export function hProp<K extends keyof SVGElementTagNameMap>(
  props: Props<SVGElementTagNameMap[K]>
): void;
export function hProp<T extends object>(props: Props<T>): void;
export function hProp(props: any) {
  // 组件运行的时候会设置该值，此时说明 hProp 指令
  // 运行在组件内，用以向组件传递 prop。
  if (getComponentProps()) {
    return processComponentProps(props);
  }

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hProp');

  if (isReactive(props)) {
    autoUpdate(() =>
      forEachObj(props, (value, key) => {
        (currentElement as any)[key] = value;
      })
    );
  } else {
    forEachObj(props, (value, key) => {
      if (isFunction(value)) {
        autoUpdate(() => ((currentElement as any)[key] = value()));
      } else {
        (currentElement as any)[key] = value;
      }
    });
  }
}

function processComponentProps(props: any) {
  const componentProps = getComponentProps();
  if (isReactive(props)) {
    autoUpdate(() =>
      forEachObj(props, (value, key) => {
        componentProps![key as string] = value;
      })
    );
  } else {
    forEachObj(props, (value, key) => {
      if (isFunction(value)) {
        autoUpdate(() => (componentProps![key as string] = value()));
      } else {
        componentProps![key as string] = value;
      }
    });
  }
}
