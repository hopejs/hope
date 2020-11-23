import { logWarn } from '@hopejs/shared';

export function outsideWarn(keyword: string) {
  logWarn(`${keyword} 指令应该放在标签函数内部使用。`);
}
