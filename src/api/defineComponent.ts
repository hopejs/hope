import { appendChild, createPlaceholder, removeChild } from "@/renderer";
import {
  getContainer,
  getCurrntBlockFragment,
  collectUnmountedHook,
  setLifecycleHandlers,
  getLifecycleHandlers,
  resetLifecycleHandlers,
  getStyleElement,
  deleteStyleElement,
  getComponentOn,
  resetComponentOn,
  setComponentOn,
  getComponentProps,
  resetComponentProps,
  setComponentProps,
  getSlots,
  resetSlots,
  setSlots,
  setQueueAddScope,
} from "@/core";
import {
  isString,
  getLast,
  isElement,
  forEachObj,
  isOn,
  parseEventName,
} from "@/shared";
import { mount } from "./render";
import { onUnmounted } from "./lifecycle";
import { setEvent } from "./props-and-attrs/event";
import { setPropsForComponent } from "./props-and-attrs/props";
import {
  getCurrentComponent,
  pushToParent,
  setBackToParent,
  setComponentOfNeedUpdate,
  setCurrentComponent,
} from "@/core/scheduler";

interface ComponentOptions<
  P = Record<string, any>,
  S = Record<string, (props: object) => any>
> {
  props: P;
  slots: S;
  emit(type: string, ...arg: any[]): any;
}

type MountOptions<P, S> = {
  target: string | Element;
  props?: P;
  slots?: S;
  on?: Record<string, (...arg: any[]) => any>;
};

export type ComponentStartTag<P = any> = (
  props?: { [K in keyof P]?: P[K] | (() => P[K]) } & Record<string, any>
) => any;
export type ComponentEndTag = (...arg: any[]) => any;

export type Component<P = any, S = any> = [
  ComponentStartTag<P>,
  ComponentEndTag
] & {
  mount: (options: MountOptions<P, S> | string | Element) => any;
};

// dynamic style id
// 每渲染一次组件就会自增一下
let dsid = 0;
const dsidStack: number[] = [];

// component id
let cid = 0;
const cidStack: number[] = [];

const stackForAddScope: Function[][] = [];

const styleTypes: Record<
  string,
  Record<"hasDynamic" | "hasStatic", boolean>
> = {};

// 记录某一个组件的实例个数
const componentInstanceCount: Record<string, number> = {};

const componentCssRuleId: Record<string, number | undefined> = {};

let betweenStartAndEnd = false;

export function defineComponent<P, S = any>(
  setup: (options: ComponentOptions<P, S>) => any
) {
  cid++;
  const startTag = (props?: any) => {
    const updateQueue = Object.create(null);
    pushToParent(getCurrentComponent(), updateQueue);
    setCurrentComponent(updateQueue);
    setComponentOfNeedUpdate(updateQueue);
    setLifecycleHandlers();

    const container = getContainer();
    const startPlaceholder = createPlaceholder(
      `${setup.name || "component"} start`
    );
    appendChild(container, startPlaceholder);
    pushStartToBlockFragment(startPlaceholder);
    setSlots();
    setComponentProps();
    setComponentOn();
    betweenStartAndEnd = true;
    props &&
      forEachObj(props as any, (value, key: string) => {
        if (isOn(key)) {
          const eventName = parseEventName(key);
          setEvent(eventName.name, eventName.modifier, value);
        } else {
          setPropsForComponent(props);
        }
      });
  };
  startTag.cid = cid;

  const endTag = (
    options: {
      props?: P;
      slots?: S;
      on?: Record<string, (...arg: any[]) => any>;
    } = {}
  ) => {
    betweenStartAndEnd = false;
    dsid++;
    dsidStack.push(dsid);
    cidStack.push(startTag.cid);
    stackForAddScope.push([]);

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
    setQueueAddScope(getCurrentQueueAddScope());

    // 页面中没有该组件时，remove 掉相关 style 元素
    const componentId = getCurrentCid()!;
    onUnmounted(() => {
      if (--componentInstanceCount[componentId] === 0) {
        const styleEl = getStyleElement(componentId);
        styleEl && removeChild(styleEl);
        deleteStyleElement(componentId);
        delete componentInstanceCount[componentId];
      }
    });

    componentCssRuleId[componentId] = 0;
    setup({ props, slots, emit });

    popStartFromBlockFragment();
    flushQueueAddScope();
    stackForAddScope.pop();
    setQueueAddScope(getCurrentQueueAddScope());
    cidStack.pop();
    dsidStack.pop();

    // 必须放在 setup 函数之后
    resetLifecycleHandlers();

    const endPlaceholder: any = createPlaceholder(
      `${setup.name || "component"} end`
    );
    const container = getContainer();
    appendChild(container, endPlaceholder);

    incrementComponentInstanceCount(componentId);
    setBackToParent();
    setComponentOfNeedUpdate(getCurrentComponent());
  };

  const result: Component<P, S> = [startTag, endTag] as any;
  result.mount = (options: MountOptions<P, S> | string | Element): P => {
    if (isString(options) || isElement(options)) {
      options = { target: options, props: {} as P };
    }

    options.props = options.props || ({} as P);

    startTag();
    endTag(options);
    mount(options.target);

    return options.props;
  };

  return result;
}

/**
 * 获取组件实例的 dynamic style id,
 * 相同组件不同实例之间 dynamic style id 不相同
 */
export function getCurrentDsid() {
  const dsid = getLast(dsidStack);
  return dsid ? `h-dsid-${dsid}` : undefined;
}

/**
 * 获取组件 cid,
 * 相同组件不同实例之间 cid 相同
 */
export function getCurrentCid() {
  const cid = getLast(cidStack);
  return cid ? `h-cid-${cid}` : undefined;
}

export function setHasDynamic(value: boolean) {
  const componentId = getCurrentCid()!;
  (
    styleTypes[componentId] ||
    (styleTypes[componentId] = { hasDynamic: false, hasStatic: false })
  ).hasDynamic = value;
}

export function setHasStatic(value: boolean) {
  const componentId = getCurrentCid()!;
  (
    styleTypes[componentId] ||
    (styleTypes[componentId] = { hasDynamic: false, hasStatic: false })
  ).hasStatic = value;
}

export function getComponentInstanceCount(componentId: string) {
  return componentInstanceCount[componentId];
}

export function getComponentCssRuleId(
  componentId: string,
  groupId?: (number | string)[]
) {
  if (groupId && groupId.length) {
    return groupId.join("-") + "-" + componentCssRuleId[componentId];
  }
  return componentCssRuleId[componentId];
}

export function incrementComponentCssRuleId(componentId: string) {
  componentCssRuleId[componentId]!++;
}

export function setComponentCssRuleId(componentId: string, value: number) {
  componentCssRuleId[componentId] = value;
}

/**
 * 表示代码运行到组件的开标签和闭标签之间的区域
 */
export function isBetweenStartAndEnd() {
  return betweenStartAndEnd;
}

function incrementComponentInstanceCount(cid: string) {
  if (cid in componentInstanceCount) {
    return componentInstanceCount[cid]++;
  }
  componentInstanceCount[cid] = 1;
}

function hasDynamicStyle() {
  const styleType = styleTypes[getCurrentCid()!];
  return styleType ? styleType.hasDynamic : false;
}

function hasStaticStyle() {
  const styleType = styleTypes[getCurrentCid()!];
  return styleType ? styleType.hasStatic : false;
}

function getCurrentQueueAddScope() {
  return getLast(stackForAddScope);
}

/**
 * 开始执行添加 scopeId 的活动
 */
function flushQueueAddScope() {
  getCurrentQueueAddScope()!.forEach((job) => {
    const cid = getCurrentCid()!;
    hasStaticStyle() && job(cid);
    hasDynamicStyle() && job(getCurrentDsid());
  });
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
