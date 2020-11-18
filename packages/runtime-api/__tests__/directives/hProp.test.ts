import {
  getCurrentElement,
  getCurrntBlockFragment,
  HopeElement,
} from "@hopejs/runtime-core";
import { reactive } from "@hopejs/reactivity";
import { hProp, div, $div, block, defineComponent } from "../../src";

describe("hProp", () => {
  const KEY = "_hopejs_test";
  const [testComponent, $testComponent] = defineComponent<any, any>(
    ({ props }) => {
      div();
      $div();
    }
  );

  it("basic", () => {
    div();
    hProp(KEY, "123");
    // @ts-ignore
    expect(getCurrentElement()[KEY]).toBe(`123`);
    $div();
  });

  it("reactivity", () => {
    const state = reactive({ name: "a" });

    div();
    hProp(KEY, () => state.name);
    const el = getCurrentElement();
    // @ts-ignore
    expect(el[KEY]).toBe(`a`);
    $div();

    state.name = "b";
    // @ts-ignore
    expect(el[KEY]).toBe(`b`);
  });

  it("_hope_effects", () => {
    let el: HopeElement;
    block(() => {
      div();
      hProp(KEY, () => "name");
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
      hProp(KEY, "name");
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);
  });

  it("_hope_effects & with component", () => {
    let startPlaceholder: HopeElement;
    block(() => {
      testComponent();
      hProp("a", () => "name");
      startPlaceholder = getCurrntBlockFragment()
        ?._elementStack[0]!;
      $testComponent();
    });

    // @ts-ignore
    expect(startPlaceholder._hope_effects?.length).toBe(1);
  });

  it("_hope_effects & no reactivity & with component", () => {
    let startPlaceholder: HopeElement;
    block(() => {
      testComponent();
      hProp("b", "name");
      startPlaceholder = getCurrntBlockFragment()
        ?._elementStack[0]!;
      $testComponent();
    });

    // @ts-ignore
    expect(startPlaceholder._hope_effects).toBe(undefined);
  });
});
