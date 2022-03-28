import { clearFragmentChildren, getCurrentElement, nextTick } from "@/core";
import { delay } from "@/shared";
import { div, defineComponent, $div, hText, mount } from "@/api";
import { isBetweenStartAndEnd } from "@/api/defineComponent";
import { hIf } from "@/api/directives/hIf";
import { refresh } from "@/core/scheduler";

describe("defineComponent", () => {
  it("basic", async () => {
    clearFragmentChildren();
    const [helloWorld, $helloWorld] = defineComponent(() => {
      div();
      hText("Hello World");
      $div();
    });

    const container = document.createElement("div");
    helloWorld();
    $helloWorld();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>Hello World</div><!--component end-->`
    );
  });

  it("mount", async () => {
    clearFragmentChildren();
    const HelloWorld = defineComponent(() => {
      div();
      hText("Hello Hope");
      $div();
    });

    const container = document.createElement("div");
    HelloWorld.mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>Hello Hope</div><!--component end-->`
    );
  });

  it("props", async () => {
    clearFragmentChildren();
    const p = { name: "a" };
    const [person, $person] = defineComponent<{ name: string }>(({ props }) => {
      div();
      hText(() => props.name);
      $div();
    });

    person({ name: () => p.name });
    $person();

    const container = document.createElement("div");
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>a</div><!--component end-->`
    );

    p.name = "b";
    refresh();
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>b</div><!--component end-->`
    );
  });

  it("emit", async () => {
    clearFragmentChildren();
    let el: Element;
    const [person, $person] = defineComponent<any, any>(({ emit }) => {
      div({
        onClick: () => {
          emit && emit("testClick", 123);
        },
      });
      el = getCurrentElement()!;
      $div();
    });

    const fn = jest.fn((arg) => {
      expect(arg).toBe(123);
    });

    person({ onTestClick: fn });
    $person();

    const container = document.createElement("div");
    mount(container);
    await delay();

    // @ts-ignore
    el.dispatchEvent(new CustomEvent("click"));
    expect(fn).toBeCalledTimes(1);
  });

  it("block & component", async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent<{ a: string }>(({ props }) => {
      div();
      hText(() => props.a);
      $div();
    });
    const [test, $test] = defineComponent(() => {
      hIf(true, () => {
        div();
        $div();
        com({ a: () => "b" });
        $com();
      });
    });

    test();
    $test();

    const container = document.createElement("div");
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div></div><!--component start--><div>b</div><!--component end--><!--component end-->`
    );
  });

  it("nest block & component", async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent<any, any>(() => {
      div();
      $div();
    });

    const [test1, $test1] = defineComponent(() => {
      hIf(
        () => true,
        () => {
          div();
          hIf(true, () => {
            com();
            $com();
          });
          $div();
        }
      );
    });

    test1();
    $test1();
    const container1 = document.createElement("div");
    mount(container1);
    await delay();
    expect(container1.innerHTML).toBe(
      `<!--component start--><!--block start--><div><!--component start--><div></div><!--component end--></div><!--block end--><!--component end-->`
    );

    const [test2, $test2] = defineComponent(() => {
      hIf(
        () => true,
        () => {
          div();
          hIf(true, () => {
            div();
            $div();
          });
          com();
          $com();
          $div();
        }
      );
    });

    test2();
    $test2();
    const container2 = document.createElement("div");
    mount(container2);
    await delay();
    expect(container2.innerHTML).toBe(
      `<!--component start--><!--block start--><div><div></div><!--component start--><div></div><!--component end--></div><!--block end--><!--component end-->`
    );
  });

  it("isBetweenStartAndEnd", async () => {
    clearFragmentChildren();
    const [com, $com] = defineComponent<any, any>(() => {
      div();
      $div();
    });

    expect(isBetweenStartAndEnd()).toBe(false);
    com();
    expect(isBetweenStartAndEnd()).toBe(true);
    $com();
    expect(isBetweenStartAndEnd()).toBe(false);

    const container = document.createElement("div");
    mount(container);
    await delay();

    expect(container.innerHTML).toBe(
      "<!--component start--><div></div><!--component end-->"
    );
  });
});
