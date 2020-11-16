import { getCurrentElement } from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hComment, div, $div } from "../../src";

describe("hComment", () => {
  it("basic", () => {
    div();
    hComment("");
    expect(getCurrentElement()?.innerHTML).toBe("<!---->");
    $div();
  });

  it("reactivity", () => {
    const state = reactive({ name: "a" });

    div();
    hComment(() => state.name);
    const el = getCurrentElement();
    expect(el?.innerHTML).toBe(`<!--a-->`);
    $div();

    state.name = "b";
    expect(el?.innerHTML).toBe(`<!--b-->`);
  });
});
