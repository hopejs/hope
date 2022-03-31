export { getCurrentElement, nextTick, refresh } from '@/core';

export * from './tags';
export * from './render';
export * from './autoUpdate';

// 指令
export { hShow } from './directives/hShow';
export { hText } from './directives/hText';
export { hComment } from './directives/hComment';
export { hSlot } from './directives/hSlot';
export { hFor } from './directives/hFor';
export { hIf } from './directives/hIf';

// block 可以让结构性变化变成可响应式的
export { block } from './block';

export { addCssRule as s, keyframes, media } from './style';

export {
  defineComponent,
  ComponentStartTag,
  ComponentEndTag,
} from './defineComponent';

// 组件的生命周期钩子
export {
  onMounted,
  onUnmounted,
  onUpdated,
  onElementUnmounted,
} from './lifecycle';
