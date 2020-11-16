import { getCurrentElement } from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hClass, div, $div } from "../../src";

describe("hClass", () => {
  it("basic", () => {
    div();
    hClass("some");
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="some"></div>`);
    $div();
  });

  it("reactivity", () => {
    const state = reactive({ name: "a" });

    div();
    hClass(() => state.name);
    const el = getCurrentElement();
    expect(el?.outerHTML).toBe(`<div class="a"></div>`);
    $div();

    state.name = "b";
    expect(el?.outerHTML).toBe(`<div class="b"></div>`);
  });

  it("object", () => {
    div();
    hClass({ some: true });
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="some"></div>`);
    $div();

    div();
    hClass({ some: false });
    expect(getCurrentElement()?.outerHTML).toBe(`<div></div>`);
    $div();
  });

  it("array", () => {
    div();
    hClass(["some"]);
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="some"></div>`);
    $div();

    div();
    hClass(["some", "thing"]);
    expect(getCurrentElement()?.outerHTML).toBe(
      `<div class="some thing"></div>`
    );
    $div();
  });

  it("object & array", () => {
    div();
    hClass([{ some: true }, "thing"]);
    expect(getCurrentElement()?.outerHTML).toBe(
      `<div class="some thing"></div>`
    );
    $div();

    div();
    hClass([{ some: false }, "thing"]);
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="thing"></div>`);
    $div();
  });
});
