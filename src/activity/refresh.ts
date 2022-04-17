import { nextTick } from '@/api/scheduler';
import { getCurrentScope, notify, ScopeTree } from './makeScopeTree';

// void repeated refresh
const memo = new WeakMap();

export const refresh = (currentScope: ScopeTree) => {
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
