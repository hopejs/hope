import { reactive } from '@hopejs/reactivity';
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
    const state = reactive({ text: 'a', show: true });

    const [com, $com] = defineComponent<any, any>(({ props }) => {
      onMounted(mounted);
      onUnmounted(unmounted);
      onUpdated(updated);

      div();
      hText(() => props.text);
      $div();
    });

    render(com, $com, state);

    const container = document.createElement('div');
    mount(container);
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(1);

    state.text = 'b';
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(2);

    state.text = 'c';
    state.text = 'd';
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(3);

    state.show = false;
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(1);
    expect(updated).toBeCalledTimes(3);
  };

  it('basic', async () => {
    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          com();
          hProp('text', () => state.text);
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
            hProp('text', () => state.text);
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
          hProp('text', () => state.text);
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
          hProp('text', () => state.text);
          $com();
        }
      });
    });

    await common((com, $com, state) => {
      block(() => {
        if (state.show) {
          com();
          hProp('text', () => state.text);
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
              hProp('text', () => state.text);
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
            hProp('text', () => state.text);
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
            hProp('text', () => state.text);
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
            hProp('text', () => state.text);
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
            hProp('text', () => state.text);
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
            hProp('text', () => state.text);
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
            hProp('text', () => state.text);
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
            hProp('text', () => state.text);
            $com();
          });
        }
        $div();
      });
    });
  });
});
