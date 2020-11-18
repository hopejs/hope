import { getCurrentElement, HopeElement } from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hId, div, $div, block } from "../../src";

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

  it("_hope_effects", () => {
    let el: HopeElement;
    block(() => {
      div();
      hId(() => "name");
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects?.length).toBe(1);
  });

  it("_hope_effects & no reactivity", () => {
    let el: HopeElement;
    block(() => {
      div();
      hId("name");
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);
  });
});
