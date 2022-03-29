import { getCurrentElement, HopeElement, nextTick } from "@/core";
import { hComment, div, $div, defineComponent } from "@/api";
import { refresh } from "@/core/scheduler";
import { LIFECYCLE_KEYS } from "@/shared";
import { hIf } from "@/api/directives/hIf";

describe("hComment", () => {
  it("basic", () => {
    const [com, $com] = defineComponent(() => {
      div();
      hComment("");
      expect(getCurrentElement()?.innerHTML).toBe("<!---->");
      $div();
    });

    com();
    $com();
  });

  it("reactivity", async () => {
    const state = { name: "a" };
    let el: HopeElement;

    const [com, $com] = defineComponent(() => {
      div();
      hComment(() => state.name);
      el = getCurrentElement()!;
      expect(el?.innerHTML).toBe(`<!--a-->`);
      $div();
    });

    com();
    $com();

    state.name = "b";
    refresh();
    await nextTick();
    expect(el!?.innerHTML).toBe(`<!--b-->`);
  });

  it("elementUnmounted", () => {
    let el: HopeElement;

    const [com, $com] = defineComponent(() => {
      hIf(
        () => true,
        () => {
          div();
          hComment(() => "name");
          el = getCurrentElement()!;
          $div();
        }
      );
    });

    com();
    $com();
    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]?.size).toBe(1);
  });

  it("elementUnmounted & no reactivity", () => {
    let el: HopeElement;

    const [com, $com] = defineComponent(() => {
      div();
      hComment("name");
      el = getCurrentElement()!;
      $div();
    });

    com();
    $com();

    // @ts-ignore
    expect(el[LIFECYCLE_KEYS.elementUnmounted]).toBe(undefined);
  });
});
