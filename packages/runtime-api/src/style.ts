import {
  appendChild,
  createElement,
  createTextNode,
  getHead,
  removeChild,
  setAttribute,
} from '@hopejs/renderer';
import {
  queueJob,
  collectEffects,
  inComponent,
  getLifecycleHandlers,
  callUpdated,
} from '@hopejs/runtime-core';
import {
  getScopeIdVersion,
  isFunction,
  isString,
  logError,
  logWarn,
} from '@hopejs/shared';
import { effect } from '@hopejs/reactivity';
import { getCurrentSid, getCurrentDid, pushUseId } from './defineComponent';
import { onUnmounted } from './lifecycle';

type StyleText = Text & { _hopejs_style_count?: number };

const styleElement = createElement('style');
setAttribute(styleElement, 'type', 'text/css');
const styleTexts: Record<string, StyleText> = {};
let isMounted = false;

export function style(value: string): void;
export function style(value: () => string): void;
export function style(value: any) {
  if (!inComponent()) {
    logWarn('style 函数只能在组件中使用！');
    return;
  }

  if (!isMounted) {
    appendChild(getHead(), styleElement);
    isMounted = true;
  }

  if (isString(value)) {
    const cid = getCurrentSid()!;
    const textNode = styleTexts[cid];
    textNode
      ? textNode._hopejs_style_count!++
      : addNewText(cid, transformCss(value, cid));

    pushUseId(cid);
    // 组件卸载时，删除样式文本
    onUnmounted(() => {
      removeText(cid);
    });
  } else if (isFunction(value)) {
    const sid = getCurrentDid()!;
    if (sid in styleTexts) {
      logError('组件中只允许调用一次 style 方法。');
      return;
    }
    const { updatedHandlers } = getLifecycleHandlers();
    const textNode = addNewText(sid);
    const ef = effect(
      () => {
        textNode.data = transformCss(value(), sid);
        updatedHandlers && callUpdated(updatedHandlers);
      },
      { scheduler: queueJob }
    );
    collectEffects(ef);
    pushUseId(sid);

    // 组件卸载时，删除样式文本
    onUnmounted(() => {
      removeText(sid);
    });
  } else {
    logError(`参数[${value}]不合法，应该为字符串或一个返回字符串的函数。`);
  }
}

function addNewText(cidOrSid: string, value?: string) {
  const text: StyleText = createTextNode(value || '');
  text._hopejs_style_count = 1;
  styleTexts[cidOrSid] = text;
  appendChild(styleElement, text);
  return text;
}

function removeText(cidOrSid: string) {
  const text = styleTexts[cidOrSid];
  if (text && !--text._hopejs_style_count!) {
    delete styleTexts[cidOrSid];
    removeChild(text);
  }
}

/**
 * 为 css 样式文本加上作用域 ID，
 * 作用域 ID 的值是 cid 或者 sid。
 * @param value
 */
function transformCss(value: string, scopeId: string) {
  return getScopeIdVersion(value, scopeId);
}
