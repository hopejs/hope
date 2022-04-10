import { makeScope } from '@/activity';
import { getCurrentScope, Scope, ScopeProp } from '@/activity/makeScope';
import { forEachObj, isFunction, isObject } from '@/utils';

export function defineComponent<T extends (...params: any[]) => void>(
  block: T
): T {
  return ((...params: any[]) => {
    markParamsWithScope(getCurrentScope(), params);
    makeScope(() => {
      block(...params);
    });
  }) as unknown as T;
}

function markParamsWithScope(scope: Scope | null, params: any[]) {
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
