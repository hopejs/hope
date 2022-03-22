import { logError } from '@/shared';

export function outsideError(keyword: string) {
  logError(`${keyword} 指令应该放在标签函数内部使用。`);
}
