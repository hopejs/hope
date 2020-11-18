import { reactive } from "@hopejs/reactivity";
import { getCurrentElement, HopeElement } from "@hopejs/runtime-core";
import { div, $div, hStyle, block } from "../../src";

describe("hStyle", () => {
  it("basic", () => {
    div();
    hStyle({ color: "red" });
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div style="color:red;"></div>`);
    $div();
  });

  it("array", () => {
    const obj1 = { color: "red" };
    const obj2 = { backgroundColor: "red" };
    div();
    hStyle([obj1, obj2]);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(
      `<div style="color:red;background-color:red;"></div>`
    );
    $div();
  });

  it("reactivity", () => {
    const color = reactive({ value: "red" });

    div();
    hStyle(() => ({ color: color.value }));
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div style="color:red;"></div>`);
    $div();

    color.value = "blue";
    expect(el?.outerHTML).toBe(`<div style="color:blue;"></div>`);
  });

  it("_hope_effects", () => {
    let el: HopeElement;
    block(() => {
      div();
      hStyle(() => ({ color: "red" }));
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
      hStyle({ color: "red" });
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);
  });
});
