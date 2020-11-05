import { effect, reactive } from "@hopejs/hope";

describe('effect', () => {
  it('第一次应该执行', () => {
    const fn = jest.fn();
    effect(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('基本类型', () => {
    const proxy = reactive(1);
    let result;
    effect(() => {
      result = proxy.value;
    });
    expect(result).toBe(1);
    proxy.value++;
    expect(result).toBe(2);
  });

  it('object', () => {
    const proxy = reactive({ name: 'a' });
    let result;
    effect(() => {
      result = proxy.name;
    });
    expect(result).toBe('a');
    proxy.name = 'b';
    expect(result).toBe('b');
  });

  it('传参数', () => {
    let result;
    effect(v => result = v, 'a');
    expect(result).toBe('a');

    effect((v1, v2) => result = [v1, v2], 'a', 'b');
    expect(result).toEqual(['a', 'b']);

    const proxy = reactive({ name: 'd' });
    effect(v => result = [v, proxy.name], 'c');
    expect(result).toEqual(['c', 'd']);

    proxy.name = 'e';
    expect(result).toEqual(['c', 'e']);
  });
});