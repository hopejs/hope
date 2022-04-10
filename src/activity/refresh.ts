import { nextTick } from '..';
import { getCurrentScope, notify } from './makeScope';

export function refresh() {
  const currentScope = getCurrentScope();
  currentScope && nextTick(() => notify(currentScope));
}
