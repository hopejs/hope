import { canUseLifecycle } from "@/core";
import { delay } from "@/shared";
import {
  div,
  ComponentEndTag,
  ComponentStartTag,
  defineComponent,
  $div,
  hText,
  mount,
  nextTick,
  onElementUnmounted,
  onMounted,
  onUnmounted,
  onUpdated,
} from "@/api";
import { hIf } from "@/api/directives/hIf";
import { refresh } from "@/core/scheduler";

describe("lifecycle", () => {
  const common = async (
    render: (com: ComponentStartTag, $com: ComponentEndTag, state: any) => void
  ) => {
    const mounted = jest.fn();
    const unmounted = jest.fn();
    const updated = jest.fn();
    // 元素的卸载钩子
    const elementUnmounted = jest.fn();
    const state = { text: "a", show: true };

    const [com, $com] = defineComponent<any, any>(({ props }) => {
      onMounted(mounted);
      onUnmounted(unmounted);
      onUpdated(updated);

      div();
      hText(() => props.text);
      // 需放在元素的开始标签和结束标签之间
      onElementUnmounted(elementUnmounted);
      $div();
    });

    render(com, $com, state);

    const container = document.createElement("div");
    mount(container);
    await delay();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(1);
    expect(elementUnmounted).toBeCalledTimes(0);

    state.text = "b";
    refresh();
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(2);
    expect(elementUnmounted).toBeCalledTimes(0);

    state.text = "c";
    state.text = "d";
    refresh();
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(3);
    expect(elementUnmounted).toBeCalledTimes(0);

    state.show = false;
    refresh();
    await nextTick();
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(1);
    expect(updated).toBeCalledTimes(3);
    expect(elementUnmounted).toBeCalledTimes(1);

    state.show = true;
    refresh();
    await nextTick();
    expect(mounted).toBeCalledTimes(2);
    expect(unmounted).toBeCalledTimes(1);
    expect(updated).toBeCalledTimes(4);
    expect(elementUnmounted).toBeCalledTimes(1);

    state.show = false;
    refresh();
    await nextTick();
    expect(mounted).toBeCalledTimes(2);
    expect(unmounted).toBeCalledTimes(2);
    expect(updated).toBeCalledTimes(4);
    expect(elementUnmounted).toBeCalledTimes(2);
  };

  it("basic", async () => {
    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(
          () => state.show,
          () => {
            com({ text: () => state.text });
            $com();
          }
        );
      });
    });
  });

  it("nest block", async () => {
    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              com({ text: () => state.text });
              $com();
            }
          );
        });
      });
    });
  });

  it("div inner", async () => {
    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          div();
          hIf(
            () => state.show,
            () => {
              com({ text: () => state.text });
              $com();
            }
          );
          $div();
        });
      });
    });
  });

  it("div brother", async () => {
    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          div();
          $div();
          hIf(
            () => state.show,
            () => {
              com({ text: () => state.text });
              $com();
            }
          );
        });
      });
    });

    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              com({ text: () => state.text });
              $com();
            }
          );
          div();
          $div();
        });
      });
    });
  });

  it("nest if & nest block", async () => {
    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              hIf(
                () => state.show,
                () => {
                  com({ text: () => state.text });
                  $com();
                }
              );
            }
          );
        });
      });
    });
  });

  it("nest block & if block", async () => {
    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              hIf(true, () => {
                com({ text: () => state.text });
                $com();
              });
            }
          );
        });
      });
    });

    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              hIf(true, () => {
                div();
                com({ text: () => state.text });
                $com();
                $div();
              });
            }
          );
        });
      });
    });

    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              hIf(true, () => {
                div();
                $div();
                com({ text: () => state.text });
                $com();
              });
            }
          );
        });
      });
    });

    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              hIf(true, () => {
                com({ text: () => state.text });
                $com();
                div();
                $div();
              });
            }
          );
        });
      });
    });

    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              div();
              $div();
              hIf(true, () => {
                com({ text: () => state.text });
                $com();
              });
            }
          );
        });
      });
    });

    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          hIf(
            () => state.show,
            () => {
              div();
              hIf(true, () => {
                com({ text: () => state.text });
                $com();
              });
              $div();
            }
          );
        });
      });
    });

    await common((com, $com, state) => {
      createAndRunCom(() => {
        hIf(true, () => {
          div();
          hIf(
            () => state.show,
            () => {
              hIf(true, () => {
                com({ text: () => state.text });
                $com();
              });
            }
          );
          $div();
        });
      });
    });
  });
});

function createAndRunCom(block: () => void) {
  const [com, $com] = defineComponent(() => {
    block();
  });
  com();
  expect(canUseLifecycle()).toBe(true);
  $com();
}
