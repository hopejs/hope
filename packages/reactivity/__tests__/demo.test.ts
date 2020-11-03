function foo() {
  return 1;
}

describe('demo', () => {
  test('test', () => {
    expect(foo()).toBe(1);
  })
})