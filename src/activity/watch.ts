import { getCurrentScope, subscribe } from './makeScope';

export function watch<P>(prop: () => P, effect: (param: P) => void) {
  let oldValue: P;
  const block = () => {
    const newValue = prop();
    if (oldValue === newValue) return;
    oldValue = newValue;

    effect(newValue);
  };
  // TODO: 当组件被销毁的时候，要清除相关引用
  const currentScope = getCurrentScope();
  subscribe(currentScope, block);
}
