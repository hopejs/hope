import { makeScope, refresh, watch } from '@/activity';
import { getCurrentScope } from '@/activity/makeScope';
import { nextTick } from '@/api';

describe('makeScope', () => {
  it('basic', async () => {
    let text = '1';
    let result = '';

    makeScope(() => {
      const currentScope = getCurrentScope();
      expect(currentScope).toEqual({});

      watch(
        () => text,
        (text) => {
          result = text;
        }
      );
      expect(result).toBe('1');

      text = '2';
      refresh();
    });

    await nextTick();
    expect(result).toBe('2');
  });
});
