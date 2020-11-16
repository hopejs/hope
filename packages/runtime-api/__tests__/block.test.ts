import { reactive } from "@hopejs/reactivity";
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
});
