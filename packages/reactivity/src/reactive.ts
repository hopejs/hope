import { hasOwn, isArray, isObject, isSymbol, logError } from "@hopejs/shared";
import { track, trigger } from "./effect";

interface Ref<T = any> {
  value: T;
}

const TARGET_KEY = "_target_";

/**
 * 一些会引起数组结构变化和无法在 Proxy 中很好拦截的方法
 */
const arrSpecialMethod = {
  push(...arg: any) {
    const result = Array.prototype["push"].apply(this, arg);
    triggerLength(getTarget(this));
    return result;
  },

  pop() {
    const result = Array.prototype["pop"].apply(this);
    triggerLength(getTarget(this));
    return result;
  },

  shift() {
    const result = Array.prototype["shift"].apply(this);
    triggerLength(getTarget(this));
    return result;
  },

  unshift(...arg: any) {
    const result = Array.prototype["unshift"].apply(this, arg);
    triggerLength(getTarget(this));
    return result;
  },

  splice(...arg: any) {
    const result = Array.prototype["splice"].apply(this, arg);
    triggerLength(getTarget(this));
    return result;
  },

  indexOf(...arg: any) {
    const result = Array.prototype["indexOf"].apply(this, arg);
    const length = getTarget(this as any[]).length;

    // 执行 indexOf 时，会 track 返回的 index 值之前的索引（包括 index），
    // 这里的 for 循环目的是 track 剩余的索引。
    for (let i = result + 1; i < length; i++) {
      track(getTarget(this), i + "");
    }

    return result;
  },

  lastIndexOf(...arg: any) {
    const result = Array.prototype["lastIndexOf"].apply(this, arg);

    // 执行 lastIndexOf 时，会 track 返回的 index 值之后的索引（包括 index），
    // 这里的 for 循环目的是 track 剩余的索引。
    for (let i = result - 1; i >= 0; i--) {
      track(getTarget(this), i + "");
    }

    return result;
  },
};

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

let isReadonly = false;
export function setReadonly(value: boolean) {
  isReadonly = value;
}

function createReactiveObject<T extends object>(target: T): T {
  const existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const errMsg = "当前为 readonly 模式，不允许修改属性值！";

  const result = new Proxy(target, {
    get(target, property, receiver) {
      if (property === TARGET_KEY) {
        return target;
      }
      track(target, property);
      (target as any) = isArray(target)
        ? hasOwn(arrSpecialMethod, property)
          ? arrSpecialMethod
          : target
        : target;
      return Reflect.get(target, property, receiver);
    },

    set(target, property, value, receiver) {
      if (isReadonly) {
        logError(errMsg);
        return false;
      }

      const shouldTriggerLength =
        isArray(target) &&
        !hasOwn(target, property) &&
        !isSymbol(property) &&
        property >= 0;

      const oldValue = (target as any)[property];
      const result = Reflect.set(target, property, value, receiver);

      // length 值改变之后再 trigger
      shouldTriggerLength && triggerLength(target);

      if (value !== oldValue) {
        trigger(target, property);
      }
      return result;
    },

    deleteProperty(target, property) {
      if (isReadonly) {
        logError(errMsg);
        return false;
      }

      if (!(property in target)) {
        return true;
      }

      const result = Reflect.deleteProperty(target, property);
      trigger(target, property);
      return result;
    },

    has(target, property) {
      track(target, property);
      return Reflect.has(target, property);
    },
  });

  reactiveMap.set(target, result);
  return result;
}

/**
 * 获取 proxy 的目标对象
 * @param proxy
 */
export function getTarget<T extends object>(proxy: T): T {
  return (proxy as any)[TARGET_KEY];
}

/**
 * 触发数组 length 的依赖
 * @param target
 */
function triggerLength(target: object) {
  trigger(target, "length");
}
