import { foo } from '../src';

describe('hello world!', () => {
  test('foo', () => {
    expect(foo('Hello World')).toBe('Hello World');
  });
});
