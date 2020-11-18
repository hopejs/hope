import { reactive } from "@hopejs/reactivity";
import { getCurrentElement, HopeElement } from "@hopejs/runtime-core";
import { div, $div, hText, block } from "../../src";

describe("hText", () => {
  it("basic", () => {
    div();
    hText("text");
    expect(getCurrentElement()?.innerHTML).toBe(`text`);
    $div();
  });

  it("reactivity", () => {
    const content = reactive({ value: "text" });

    div();
    hText(() => content.value);
    const el = getCurrentElement();
    $div();

    expect(el?.innerHTML).toBe(`text`);
    content.value = "123";
    expect(el?.innerHTML).toBe(`123`);
  });

  it("_hope_effects", () => {
    let el: HopeElement;
    block(() => {
      div();
      hText(() => "text");
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
      hText("text");
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);
  });
});
