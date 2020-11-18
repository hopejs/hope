import { reactive } from "@hopejs/reactivity";
import { getCurrentElement, HopeElement } from "@hopejs/runtime-core";
import { $div, $span, block, div, hText, mount, span } from "../src";

describe("block", () => {
  it("basic", () => {
    const state = reactive({
      toggle: true,
    });

    block(() => {
      if (state.toggle) {
        div();
        hText("1");
        $div();
      } else {
        span();
        hText("2");
        $span();
      }
    });

    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(
      "<!--block start--><div>1</div><!--block end-->"
    );
    state.toggle = false;
    expect(container.innerHTML).toBe(
      "<!--block start--><span>2</span><!--block end-->"
    );
  });

  it("nest element", () => {
    block(() => {
      div();
      div();
      $div();
      $div();
    });

    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(
      `<!--block start--><div><div></div></div><!--block end-->`
    );
  });

  it("nest block", () => {
    block(() => {
      block(() => {
        div();
        $div();
      });
    });

    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(
      `<!--block start--><!--block start--><div></div><!--block end--><!--block end-->`
    );
  });

  it("nest block & nest element", () => {
    block(() => {
      div();
      block(() => {
        div();
        $div();
      });
      $div();
    });

    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(
      `<!--block start--><div><!--block start--><div></div><!--block end--></div><!--block end-->`
    );
  });

  it('nest block & not nest element', () => {
    block(() => {
      div();
      $div();
      block(() => {
        div();
        $div();
      });
    });

    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(
      `<!--block start--><div></div><!--block start--><div></div><!--block end--><!--block end-->`
    );
  })

  it("_hope_effects", () => {
    let el: HopeElement;
    block(() => {
      div();
      el = getCurrentElement()!;
      $div();
      block(() => {
        div();
        $div();
      });
    });
    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);

    let el2: HopeElement;
    block(() => {
      div();
      el2 = getCurrentElement()!;
      block(() => {
        div();
        $div();
      });
      $div();
    });
    // @ts-ignore
    expect(el2._hope_effects?.length).toBe(1);
    // @ts-ignore
    expect(typeof el2._hope_effects[0]).toBe("function");
  });
});
