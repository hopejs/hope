import { ref } from "@hopejs/reactivity";
import { hShow, mount, div, $div } from "../../src";

describe("hShow", () => {
  it("basic", () => {
    div();
    hShow(true);
    $div();
    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(`<div></div>`);

    div();
    hShow(false);
    $div();
    mount(container);
    expect(container.innerHTML).toBe(`<!--hShow-->`);
  });

  it("reactivity", () => {
    const show = ref(true);

    div();
    hShow(() => show.value);
    $div();
    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(`<div></div>`);

    show.value = false;
    expect(container.innerHTML).toBe(`<!--hShow-->`);
  });
});
