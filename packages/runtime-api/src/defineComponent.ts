import { appendChild, createPlaceholder } from "@hopejs/renderer";
import { getCurrentElement, getFragment } from "@hopejs/runtime-core";
import { isString } from "@hopejs/shared";
import { isReactive, reactive } from "@hopejs/reactivity";
import { isObject } from "@hopejs/shared";
import { setComponentProps } from "./directives/hProp";
import {
  getComponentOn,
  resetComponentOn,
  setComponentOn,
} from "./directives/hOn";
import { getComponentProps, resetComponentProps } from "./directives/hProp";
import { getSlots, resetSlots, setSlots } from "./directives/hSlot";
import {
  callMounted,
  callUnmounted,
  getLifecycleHandlers,
  LIFECYCLE_KEYS,
  resetLifecycleHandlers,
  setLifecycleHandlers,
} from "./lifecycle";
import { mount } from "./render";

interface ComponentOptions<P = object, S = (props: object) => any> {
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

type ComponentStartTag = (...arg: any[]) => any;
type ComponentEndTag = (...arg: any[]) => any;

type Component<P = any, S = any> = [ComponentStartTag, ComponentEndTag] & {
  mount: (options: MountOptions<P, S>) => any;
};

export function defineComponent<P, S>(
  render: (options?: ComponentOptions<P, S>) => any
): Component<P, S> {
  let result: Component<P, S>;

  let startPlaceholder;
  let endPlaceholder: any;
  let container: any;

  const startTag = () => {
    container = getCurrentElement() || getFragment();
    startPlaceholder = createPlaceholder(`${render.name || "component"} start`);
    appendChild(container, startPlaceholder);
    setSlots();
    setComponentProps();
    setComponentOn();
  };
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

    const props: P = options.props || (getComponentProps() as any);
    const slots: S = options.slots || (getSlots() as any);
    const lifecycle = getLifecycleHandlers()!;
    const on = options.on || getComponentOn();
    const emit = (type: string, ...arg: any[]) => {
      on![type] && on![type](...arg);
    };
    resetSlots();
    resetComponentProps();
    resetComponentOn();
    render({ props, slots, emit });

    // 放在组件渲染完之后，以便让指令能获取到生命周期处理函数
    resetLifecycleHandlers();

    endPlaceholder = createPlaceholder(`${render.name || "component"} end`);
    // 生命周期回调存储在占位符中，当 end 占位符从 DOM 中移出时
    // 就说明该组件已经被卸载。
    endPlaceholder[LIFECYCLE_KEYS.unmounted] = callUnmounted.bind(
      null,
      lifecycle.unmountedHandlers!
    );
    container && appendChild(container, endPlaceholder);
    callMounted(lifecycle.mountedHandlers!);
  };

  result = [startTag, endTag] as any;

  result.mount = (options: MountOptions<P, S> | string): P => {
    if (isString(options) || options instanceof Element) {
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
