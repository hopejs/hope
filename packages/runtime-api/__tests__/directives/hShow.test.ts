import { reactive } from "@hopejs/reactivity";
import { getCurrentElement, HopeElement } from "@hopejs/runtime-core";
import { hShow, mount, div, $div, block } from "../../src";

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
    const show = reactive({ value: true });

    div();
    hShow(() => show.value);
    $div();
    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(`<div></div>`);

    show.value = false;
    expect(container.innerHTML).toBe(`<!--hShow-->`);
  });

  it("nest element", () => {
    const show = reactive({ value: false });

    div();
    hShow(() => show.value);
    div();
    $div();
    $div();
    const container = document.createElement("div");
    mount(container);
    expect(container.innerHTML).toBe(`<!--hShow-->`);

    show.value = true;
    expect(container.innerHTML).toBe(`<div><div></div></div>`);
  });

  it("_hope_effects", () => {
    let el: HopeElement;
    block(() => {
      div();
      hShow(() => true);
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
      hShow(true);
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);
  });
});
