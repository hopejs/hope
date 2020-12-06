import { createComment } from './createComment';
import { createTextNode } from './createTextNode';

export function createPlaceholder(value: string) {
  return __DEV__ ? createComment(value) : createTextNode('');
}
