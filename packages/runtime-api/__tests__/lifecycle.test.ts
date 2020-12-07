import { reactive } from '@hopejs/reactivity';
import { canUseLifecycle } from '@hopejs/runtime-core';
import { delay } from '@hopejs/shared';
import {
  $div,
  block,
  ComponentEndTag,
  ComponentStartTag,
  defineComponent,
  div,
  hProp,
  hText,
  mount,
  nextTick,
  onElementUnmounted,
  onMounted,
  onUnmounted,
  onUpdated,
} from '../src';

describe('lifecycle', () => {
  const common = async (
    render: (com: ComponentStartTag, $com: ComponentEndTag, state: any) => void
  ) => {
    const mounted = jest.fn();
    const unmounted = jest.fn();
    const updated = jest.fn();
    // 元素的卸载钩子
    const elementUnmounted = jest.fn();
    const state = reactive({ text: 'a', show: true });

    const [com, $com] = defineComponent<any, any>(({ props }) => {
      onMounted(mounted);
      onUnmounted(unmounted);
      onUpdated(updated);

      div();
      hText(() => props.text);
      // 需放在元素的开始标签和结束标签之间
      onElementUnmounted(elementUnmounted);
      $div();

      // 在定义组件时可以使用生命周期函数
      expect(canUseLifecycle()).toBe(true);
    });

    // 在外面时不能使用生命周期函数
    expect(canUseLifecycle()).toBe(false);

    render(com, $com, state);

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(1);
    expect(elementUnmounted).toBeCalledTimes(0);

    state.text = 'b';
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(2);
    expect(elementUnmounted).toBeCalledTimes(0);

    state.text = 'c';
    state.text = 'd';
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(3);
    expect(elementUnmounted).toBeCalledTimes(0);

    state.show = false;
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(1);
    expect(updated).toBeCalledTimes(3);
    expect(elementUnmounted).toBeCalledTimes(1);

    state.show = true;
    await nextTick();
    expect(mounted).toBeCalledTimes(2);
    expect(unmounted).toBeCalledTimes(1);
    expect(updated).toBeCalledTimes(4);
    expect(elementUnmounted).toBeCalledTimes(1);

    state.show = false;
    await nextTick();
    expect(mounted).toBeCalledTimes(2);
    expect(unmounted).toBeCalledTimes(2);
    expect(updated).toBeCalledTimes(4);
    expect(elementUnmounted).toBeCalledTimes(2);
  };

  it('basic', async () => {
    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          com();
          hProp({ text: () => state.text });
          $com();
        }
      });
    });
  });

  it('nest block', async () => {
    await common((com, $com, state) => {
      block(() => {
        block(() => {
          if (state.show) {
            com();
            hProp({ text: () => state.text });
            $com();
          }
        });
      });
    });
  });

  it('div inner', async () => {
    await common((com, $com, state) => {
      block(() => {
        div();
        if (state.show) {
          com();
          hProp({ text: () => state.text });
          $com();
        }
        $div();
      });
    });
  });

  it('div brother', async () => {
    await common((com, $com, state) => {
      block(() => {
        div();
        $div();
        if (state.show) {
          com();
          hProp({ text: () => state.text });
          $com();
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          com();
          hProp({ text: () => state.text });
          $com();
        }
        div();
        $div();
      });
    });
  });

  it('nest if & nest block', async () => {
    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          block(() => {
            if (state.show) {
              com();
              hProp({ text: () => state.text });
              $com();
            }
          });
        }
      });
    });
  });

  it('nest block & if block', async () => {
    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          block(() => {
            com();
            hProp({ text: () => state.text });
            $com();
          });
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          block(() => {
            div();
            com();
            hProp({ text: () => state.text });
            $com();
            $div();
          });
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          block(() => {
            div();
            $div();
            com();
            hProp({ text: () => state.text });
            $com();
          });
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          block(() => {
            com();
            hProp({ text: () => state.text });
            $com();
            div();
            $div();
          });
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          div();
          $div();
          block(() => {
            com();
            hProp({ text: () => state.text });
            $com();
          });
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          div();
          block(() => {
            com();
            hProp({ text: () => state.text });
            $com();
          });
          $div();
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        div();
        if (state.show) {
          block(() => {
            com();
            hProp({ text: () => state.text });
            $com();
          });
        }
        $div();
      });
    });
  });
});
