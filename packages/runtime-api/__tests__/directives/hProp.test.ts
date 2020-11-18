import { getCurrentElement } from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hProp, div, $div } from "../../src";

describe("hProp", () => {
  const KEY = "_hopejs_test";

  it("basic", () => {
    div();
    hProp(KEY, "123");
    // @ts-ignore
    expect(getCurrentElement()[KEY]).toBe(`123`);
    $div();
  });

  it("reactivity", () => {
    const state = reactive({ name: "a" });

    div();
    hProp(KEY, () => state.name);
    const el = getCurrentElement();
    // @ts-ignore
    expect(el[KEY]).toBe(`a`);
    $div();

    state.name = "b";
    // @ts-ignore
    expect(el[KEY]).toBe(`b`);
  });
});
