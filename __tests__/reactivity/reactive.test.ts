import { reactive } from "@/reactivity";

describe("reactive", () => {
  it("object", () => {
    expect(reactive({ name: "a" })).toEqual({ name: "a" });
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
