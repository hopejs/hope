import { logError } from '@hopejs/shared';

export function cantUseError(keyword: string) {
  logError(`${keyword} 指令不能在组件上使用。`);
}
