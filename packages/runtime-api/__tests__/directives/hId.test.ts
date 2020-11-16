import { getCurrentElement } from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hId, div, $div } from "../../src";

describe("hId", () => {
  it("basic", () => {
    div();
    hId("some");
    expect(getCurrentElement()?.outerHTML).toBe(`<div id="some"></div>`);
    $div();
  });

  it("reactivity", () => {
    const state = reactive({ name: "a" });

    div();
    hId(() => state.name);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div id="a"></div>`);
    $div();

    state.name = "b";
    expect(el?.outerHTML).toBe(`<div id="b"></div>`);
  });
});
