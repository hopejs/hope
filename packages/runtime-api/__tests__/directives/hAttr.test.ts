import { getCurrentElement, HopeElement } from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hAttr, div, $div, block } from "../../src";

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

  it("_hope_effects", () => {
    let el: HopeElement;
    block(() => {
      div();
      hAttr("class", () => "name");
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects?.size).toBe(1);
  });

  it("_hope_effects & no reactivity", () => {
    let el: HopeElement;
    block(() => {
      div();
      hAttr("class", "name");
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);
  });
});
