import { nextTick } from '..';
import { getCurrentScope, notify } from './makeScope';

export function refresh() {
  nextTick(() => notify(getCurrentScope()));
}
