import { nextTick } from '..';
import { getCurrentScope, notify } from './makeScope';

// void repeated refresh
const memo = new WeakMap();

export function refresh() {
  const currentScope = getCurrentScope();
  if (currentScope && !memo.has(currentScope)) {
    nextTick(() => {
      memo.delete(currentScope);
      notify(currentScope);
    });
    memo.set(currentScope, true);
  }
}
