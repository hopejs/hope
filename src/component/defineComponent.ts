import { getCurrentScope, makeScopeTree, ScopeTree, ScopeProp } from '@/activity/makeScopeTree';
import { forEachObj, isFunction, isObject } from '@/utils';

export function defineComponent<T extends (...params: any[]) => void>(
  block: T
): T {
  return ((...params: any[]) => {
    markParamsWithScope(getCurrentScope(), params);
    makeScopeTree(() => {
      block(...params);
    });
  }) as unknown as T;
}

function markParamsWithScope(scope: ScopeTree | null, params: any[]) {
  if (scope === null) return;

  for (const param of params) {
    if (isFunction(param)) {
      (param as ScopeProp).s || ((param as ScopeProp).s = scope);
    } else if (isObject(param)) {
      // Shallow marker
      forEachObj(param, (value: any) => {
        if (isFunction(value)) {
          (value as ScopeProp).s || ((value as ScopeProp).s = scope);
        }
      });
    }
  }
}
