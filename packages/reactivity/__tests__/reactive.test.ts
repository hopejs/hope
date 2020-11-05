import { reactive } from "@hopejs/hope";

describe('reactive', () => {
  it('基本类型', () => {
    const n = reactive(1);
    expect(n).toEqual({ value: 1 });

    const s = reactive('s');
    expect(s).toEqual({ value: 's' });

    const symbol = Symbol('symbol');
    expect(reactive(symbol)).toEqual({ value: symbol });

    const b = reactive(true);
    expect(b).toEqual({ value: true });

    const bigint = reactive(2n);
    expect(bigint).toEqual({ value: 2n });
  });

  it('object', () => {
    expect(reactive({ name: 'a' })).toEqual({ name: 'a' });
  });
});