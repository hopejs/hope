import { effect, reactive, setReadonly } from "@hopejs/hope";

describe("reactive", () => {
  it("基本类型", () => {
    const n = reactive(1);
    expect(n).toEqual({ value: 1 });

    const s = reactive("s");
    expect(s).toEqual({ value: "s" });

    const symbol = Symbol("symbol");
    expect(reactive(symbol)).toEqual({ value: symbol });

    const b = reactive(true);
    expect(b).toEqual({ value: true });

    const bigint = reactive(2n);
    expect(bigint).toEqual({ value: 2n });
  });

  it("object", () => {
    expect(reactive({ name: "a" })).toEqual({ name: "a" });
  });

  it("readonly", () => {
    const proxy = reactive({ name: "a" });
    let result = "";
    effect(() => (result = proxy.name));
    expect(result).toBe("a");
    proxy.name = "b";
    expect(result).toBe("b");

    setReadonly(true);
    expect(() => {
      proxy.name = "a";
      expect(result).toBe("b");
    }).toThrow();

    setReadonly(false);
    proxy.name = "a";
    expect(result).toBe("a");
  });

  it("array", () => {
    const proxy = reactive([] as any[]);
    expect(proxy).toEqual([]);

    proxy.push(1);
    expect(proxy).toEqual([1]);
    proxy.push(2, 3);
    expect(proxy).toEqual([1, 2, 3]);

    proxy.pop();
    expect(proxy).toEqual([1, 2]);

    proxy.shift();
    expect(proxy).toEqual([2]);

    proxy.unshift(0, 1);
    expect(proxy).toEqual([0, 1, 2]);

    proxy.splice(0, 3, "a", "b", "c");
    expect(proxy).toEqual(["a", "b", "c"]);
    proxy.splice(0, 2);
    expect(proxy).toEqual(["c"]);
  });
});
