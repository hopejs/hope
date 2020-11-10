import { effect, reactive } from "../src";

describe("effect", () => {
  it("第一次应该执行", () => {
    const fn = jest.fn();
    effect(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("object", () => {
    const proxy = reactive({ name: "a" });
    let result;
    effect(() => {
      result = proxy.name;
    });
    expect(result).toBe("a");
    proxy.name = "b";
    expect(result).toBe("b");
  });

  it("delete", () => {
    let result;
    const proxy = reactive({ name: "a" });
    effect(() => (result = proxy.name));
    expect(result).toBe("a");
    // @ts-ignore
    delete proxy.name;
    expect(result).toBe(undefined);
  });

  it("has", () => {
    let result;
    const proxy = reactive({});
    const fn = jest.fn(() => (result = "name" in proxy));
    effect(fn);
    expect(result).toBe(false);
    // @ts-ignore
    proxy.name = "a";
    expect(result).toBe(true);
    expect(fn).toHaveBeenCalledTimes(2);

    // @ts-ignore
    delete proxy.name;
    expect(result).toBe(false);
    expect(fn).toHaveBeenCalledTimes(3);

    // @ts-ignore
    delete proxy.name;
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("length", () => {
    let result;
    const proxy = reactive([] as any[]);
    effect(() => (result = proxy.length));
    expect(result).toBe(0);

    proxy.push(1);
    expect(result).toBe(1);
    proxy.push(2, 3);
    expect(result).toBe(3);

    proxy.pop();
    expect(result).toBe(2);

    proxy.unshift(0);
    expect(result).toBe(3);
    proxy.unshift(1, 2);
    expect(result).toBe(5);

    proxy.shift();
    expect(result).toBe(4);

    proxy.splice(0, 2);
    expect(result).toBe(2);
    proxy.splice(0, 2, "a");
    expect(result).toBe(1);
  });

  it("includes", () => {
    let result;
    const proxy = reactive([1, 2, 3]);
    effect(() => (result = proxy.includes(3)));
    expect(result).toBe(true);
    proxy.pop();
    expect(result).toBe(false);
    proxy[1] = 3;
    expect(result).toBe(true);
  });

  it("indexOf", () => {
    let result;
    const proxy = reactive([1, 2, 3]);
    effect(() => (result = proxy.indexOf(1)));
    expect(result).toBe(0);
    proxy.shift();
    expect(result).toBe(-1);
    proxy[1] = 1;
    expect(result).toBe(1);
  });

  it("lastIndexOf", () => {
    let result;
    const proxy = reactive([1, 2, 3]);
    effect(() => (result = proxy.lastIndexOf(3)));
    expect(result).toBe(2);
    proxy.pop();
    expect(result).toBe(-1);
    proxy[1] = 3;
    expect(result).toBe(1);
  });

  it("对超过数组索引范围的索引赋值", () => {
    let result;
    const proxy = reactive([] as any[]);
    effect(() => (result = proxy.length));
    expect(result).toBe(0);

    proxy[10] = 10;
    expect(result).toBe(11);
  });
});
