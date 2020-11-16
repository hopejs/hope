import { ref } from "@hopejs/reactivity";
import { getCurrentElement } from "@hopejs/runtime-core";
import { div, $div, hText } from "../../src";

describe("hText", () => {
  it("basic", () => {
    div();
    hText("text");
    expect(getCurrentElement()?.innerHTML).toBe(`text`);
    $div();
  });

  it("reactivity", () => {
    const content = ref("text");

    div();
    hText(() => content.value);
    const el = getCurrentElement();
    $div();

    expect(el?.innerHTML).toBe(`text`);
    content.value = "123";
    expect(el?.innerHTML).toBe(`123`);
  });
});
