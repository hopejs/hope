interface Effect<T extends any[] = []> {
  (...arg: T): void;
  arg?: any[];
}

type Property = string | number | symbol;
type Dep = Set<Effect<any[]>>;
type KeyToDepMap = Map<any, Dep>

let activeEffect: Effect | null;
const targetMap = new WeakMap<any, KeyToDepMap>();

export function effect(fn: Effect): void;
export function effect<T extends any[]>(fn: Effect<T>, ...arg: T): void
export function effect(fn: Effect<any[]>, ...arg: any[]) {
  activeEffect = fn;
  fn.arg = arg || [];
  fn(...arg);
  activeEffect = null;
}

export function track(target: object, property: Property) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep =  depsMap.get(property);
  if (!dep) {
    depsMap.set(property, (dep = new Set()));
  }

  dep.add(activeEffect);
}

export function trigger(target: object, property: Property) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(property);
  if (!dep) return;

  dep.forEach(effect => {
    effect(...effect.arg!);
  });
}
