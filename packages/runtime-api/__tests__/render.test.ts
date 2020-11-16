import { $div, div, mount } from "../src";

describe("mount", () => {
  it("basic", () => {
    div();
    $div();
    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe("<div></div>");
  });
});
