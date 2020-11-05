import { isObject } from "@hopejs/shared";
import { track, trigger } from "./effect";

interface Ref<T = any> {
  value: T;
}

export const reactiveMap = new WeakMap<any, any>();

export function reactive(target: string): Ref<string>;
export function reactive(target: number): Ref<number>;
export function reactive(target: boolean): Ref<boolean>;
export function reactive(target: symbol): Ref<symbol>;
export function reactive(target: bigint): Ref<bigint>;
export function reactive<T extends object>(target: T): T;
export function reactive(target: any) {
  if (!isObject(target)) {
    target = { value: target };
  }

  return createReactiveObject(target);
}

function createReactiveObject<T extends object>(target: T): T {
  const existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const result = new Proxy(target, {
    get(target, property, receiver) {
      track(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      const oldValue = (target as any)[property];
      const result = Reflect.set(target, property, value, receiver);
      if (value !== oldValue) {
        trigger(target, property);
      }
      return result;
    }
  })

  reactiveMap.set(target, result);
  return result;
}
