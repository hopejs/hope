import { ref } from "@hopejs/reactivity";
import { getCurrentElement } from "@hopejs/runtime-core";
import { div, $div, hStyle } from "../../src";

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
    const color = ref("red");

    div();
    hStyle(() => ({ color: color.value }));
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div style="color:red;"></div>`);
    $div();

    color.value = "blue";
    expect(el?.outerHTML).toBe(`<div style="color:blue;"></div>`);
  });
});
