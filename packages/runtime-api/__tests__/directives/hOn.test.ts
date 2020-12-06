import { getCurrentElement } from "@hopejs/runtime-core";
import { hOn, div, $div } from "../../src";

describe("hOn", () => {
  it("basic", () => {
    const fn = jest.fn();

    div();
    hOn("click", fn);
    const el = getCurrentElement();
    $div();

    el?.dispatchEvent(new CustomEvent("click"));
    expect(fn).toBeCalledTimes(1);
  });
});
