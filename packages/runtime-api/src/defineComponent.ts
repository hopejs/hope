import { appendChild, createPlaceholder } from '@hopejs/renderer';
import { getContainer, getCurrntBlockFragment } from '@hopejs/runtime-core';
import { isString, isObject, getLast, isElement } from '@hopejs/shared';
import { isReactive, reactive } from '@hopejs/reactivity';
import { setComponentProps } from './directives/hProp';
import {
  getComponentOn,
  resetComponentOn,
  setComponentOn,
} from './directives/hOn';
import { getComponentProps, resetComponentProps } from './directives/hProp';
import { getSlots, resetSlots, setSlots } from './directives/hSlot';
import {
  getLifecycleHandlers,
  resetLifecycleHandlers,
  setLifecycleHandlers,
} from './lifecycle';
import { mount } from './render';
import { collectUnmountedHook } from './block';

interface ComponentOptions<
  P = Record<string, any>,
  S = Record<string, (props: object) => any>
> {
  props?: P;
  slots?: S;
  emit?(type: string, ...arg: any[]): any;
}

type MountOptions<P, S> = {
  target: string | Element;
  props?: P;
  slots?: S;
  on?: Record<string, (...arg: any[]) => any>;
};

export type ComponentStartTag = (...arg: any[]) => any;
export type ComponentEndTag = (...arg: any[]) => any;

type Component<P = any, S = any> = [ComponentStartTag, ComponentEndTag] & {
  mount: (options: MountOptions<P, S> | string | Element) => any;
};

// style id
// 每渲染一次组件就会自增一下
let sid = 0;
const sidStack: number[] = [];

// component id
let cid = 0;
const cidStack: number[] = [];

// 用于确定元素的 scopeId
const useIdStack: string[] = [];
const componentScopeIdStack: {
  _queueAddScope: Function[];
}[] = [];

export function defineComponent<P, S>(
  render: (options: ComponentOptions<P, S>) => any
): Component<P, S>;
export function defineComponent<P, S>(
  render: (options: any) => any
): Component<P, S> {
  let result: Component<P, S>;

  cid++;
  const startTag = () => {
    const container = getContainer();
    const startPlaceholder = createPlaceholder(
      `${render.name || 'component'} start`
    );
    appendChild(container, startPlaceholder);
    pushStartToBlockFragment(startPlaceholder);
    setSlots();
    setComponentProps();
    setComponentOn();
  };
  startTag.cid = cid;

  const endTag = (
    options: {
      props?: P;
      slots?: S;
      on?: Record<string, (...arg: any[]) => any>;
    } = {}
  ) => {
    // 放在 end 标签，可以确保组件插槽中的
    // 属性更新时正确的调用组件的父组件的生命周期钩子
    setLifecycleHandlers();

    sid++;
    sidStack.push(sid);
    cidStack.push(startTag.cid);
    componentScopeIdStack.push({ _queueAddScope: [] });

    const props: P = options.props || (getComponentProps() as any);
    const slots: S = options.slots || (getSlots() as any);
    const lifecycle = getLifecycleHandlers()!;
    const on = options.on || getComponentOn();
    const emit = (type: string, ...arg: any[]) => {
      on![type] && on![type](...arg);
    };

    collectUnmountedHook(lifecycle.unmountedHandlers);

    resetSlots();
    resetComponentProps();
    resetComponentOn();
    render({ props, slots, emit });
    popStartFromBlockFragment();
    if (!isStyleCalled()) {
      pushUseId('');
    }
    flushQueueAddScope();
    componentScopeIdStack.pop();
    cidStack.pop();
    sidStack.pop();
    useIdStack.pop();

    // 放在组件渲染完之后，以便让指令能获取到生命周期处理函数
    resetLifecycleHandlers();

    const endPlaceholder: any = createPlaceholder(
      `${render.name || 'component'} end`
    );
    const container = getContainer();
    appendChild(container, endPlaceholder);
  };

  result = [startTag, endTag] as any;

  result.mount = (options: MountOptions<P, S> | string | Element): P => {
    if (isString(options) || isElement(options)) {
      options = { target: options, props: reactive({}) as P };
    }

    options.props = (isReactive(options.props)
      ? options.props
      : isObject(options.props)
      ? reactive(options.props as any)
      : reactive({})) as P;

    startTag();
    endTag(options);
    mount(options.target);

    return options.props;
  };

  return result;
}

/**
 * 获取组件实例的 sid,
 * 相同组件不同实例之间 sid 不相同
 */
export function getCurrentSid() {
  const sid = getLast(sidStack);
  return sid ? `h-sid-${sid}` : undefined;
}

/**
 * 获取组件 cid,
 * 相同组件不同实例之间 cid 相同
 */
export function getCurrentCid() {
  const cid = getLast(cidStack);
  return cid ? `h-cid-${cid}` : undefined;
}

export function pushUseId(id: string) {
  useIdStack.push(id);
}

export function getCurrentUseId() {
  return getLast(useIdStack);
}

export function getCurrentComponentScopeId() {
  return getLast(componentScopeIdStack);
}

/**
 * 开始执行添加 scopeId 的活动
 */
function flushQueueAddScope() {
  getCurrentComponentScopeId()!._queueAddScope.forEach((job) => {
    job(getCurrentUseId());
  });
}

/**
 * 检测当前组件是否使用了 style 函数设置样式。
 */
function isStyleCalled() {
  const useId = getCurrentUseId();
  return useId === getCurrentCid() || useId === getCurrentSid();
}

/**
 * 把组件的 start 占位符 push 进 blockFragment 中
 * 的 stack 中，用以当 block 的根元素是组件时，收集
 * 组件的 effect 和 hooks。
 * @param start
 */
function pushStartToBlockFragment(start: any) {
  const blockFragment = getCurrntBlockFragment();
  if (blockFragment) {
    blockFragment._elementStack.push(start);
  }
}

/**
 * 及时清除掉之前添加的 start 占位符。
 */
function popStartFromBlockFragment() {
  const blockFragment = getCurrntBlockFragment();
  if (blockFragment) {
    blockFragment._elementStack.pop();
  }
}
