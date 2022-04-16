import { nextTick } from '..';
import { notify, Scope } from './makeScope';

// void repeated refresh
const memo = new WeakMap();

export function refresh(currentScope: Scope) {
  if (currentScope && !memo.has(currentScope)) {
    nextTick(() => {
      memo.delete(currentScope);
      notify(currentScope);
    });
    memo.set(currentScope, true);
  }
}
