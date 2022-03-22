import { once } from '@/shared';

describe('shared', () => {
  it('once', () => {
    const fn = jest.fn();
    const onceFn = once(fn);

    onceFn();
    expect(fn).toBeCalledTimes(1);
    onceFn();
    expect(fn).toBeCalledTimes(1);
  });
});
