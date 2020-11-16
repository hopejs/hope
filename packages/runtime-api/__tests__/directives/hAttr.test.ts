import { getCurrentElement } from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hAttr, div, $div } from "../../src";

describe("hAttr", () => {
  it("basic", () => {
    div();
    hAttr("abc", "abc");
    expect(getCurrentElement()?.outerHTML).toBe(`<div abc="abc"></div>`);
    $div();
  });

  it("reactivity", () => {
    const state = reactive({ name: "a" });

    div();
    hAttr("abc", () => state.name);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div abc="a"></div>`);
    $div();

    state.name = "b";
    expect(el?.outerHTML).toBe(`<div abc="b"></div>`);
  });
});
