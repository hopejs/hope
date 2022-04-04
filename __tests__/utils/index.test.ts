import { parseEventName } from '@/utils';

describe('utils', () => {
  it('parseEventName', () => {
    const name = parseEventName('onClick');
    expect(name).toBe(`click`);
  });
});
