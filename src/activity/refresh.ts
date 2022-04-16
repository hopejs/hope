import { nextTick } from '..';
import { getCurrentScope, notify, Scope } from './makeScope';

// void repeated refresh
const memo = new WeakMap();

export const refresh = (currentScope: Scope) => {
  if (currentScope && !memo.has(currentScope)) {
    nextTick(() => {
      memo.delete(currentScope);
      notify(currentScope);
    });
    memo.set(currentScope, true);
  }
};

export const withRefresh = (handler: (...params: any[]) => void) => {
  const scope = getCurrentScope();
  return (...params: any[]) => {
    handler(...params);
    scope && refresh(scope);
  };
};
