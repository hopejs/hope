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

  it('nest scope, refresh inner', async () => {
    let text = '1';
    let result_1 = '';
    let result_2 = '';

    makeScope(() => {
      const parent = getCurrentScope();
      expect(parent).toEqual({});
      watch(
        () => text,
        (text) => {
          result_1 = text;
        }
      );
      expect(result_1).toBe('1');

      makeScope(() => {
        const currentScope = getCurrentScope();
        expect(currentScope?.p).toBe(parent);
        watch(
          () => text,
          (text) => {
            result_2 = text;
          }
        );
        expect(result_2).toBe('1');
        text = '2';
        refresh();
      });
    });

    await nextTick();
    expect(result_1).toBe('1');
    expect(result_2).toBe('2');
  });

  it('nest scope, refresh outer', async () => {
    let text = '1';
    let result_1 = '';
    let result_2 = '';

    makeScope(() => {
      const parent = getCurrentScope();
      expect(parent).toEqual({});
      watch(
        () => text,
        (text) => {
          result_1 = text;
        }
      );
      expect(result_1).toBe('1');

      makeScope(() => {
        const currentScope = getCurrentScope();
        expect(currentScope?.p).toBe(parent);
        watch(
          () => text,
          (text) => {
            result_2 = text;
          }
        );
        expect(result_2).toBe('1');
        text = '2';
      });
      refresh();
    });

    await nextTick();
    expect(result_1).toBe('2');
    expect(result_2).toBe('1');
  });
});
