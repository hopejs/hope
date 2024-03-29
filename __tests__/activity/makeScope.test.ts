import { watch } from '@/activity';
import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { nextTick } from '@/api';

describe('makeScope', () => {
  it('basic', async () => {
    let text = '1';
    let result = '';

    makeScopeTree(() => {
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
      refresh(getCurrentScope()!);
    });

    await nextTick();
    expect(result).toBe('2');
  });

  it('nest scope, refresh inner', async () => {
    let text = '1';
    let result_1 = '';
    let result_2 = '';

    makeScopeTree(() => {
      const parent = getCurrentScope();
      expect(parent).toEqual({});
      watch(
        () => text,
        (text) => {
          result_1 = text;
        }
      );
      expect(result_1).toBe('1');

      makeScopeTree(() => {
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
        refresh(getCurrentScope()!);
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

    makeScopeTree(() => {
      const parent = getCurrentScope();
      expect(parent).toEqual({});
      watch(
        () => text,
        (text) => {
          result_1 = text;
        }
      );
      expect(result_1).toBe('1');

      makeScopeTree(() => {
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
      refresh(getCurrentScope()!);
    });

    await nextTick();
    expect(result_1).toBe('2');
    expect(result_2).toBe('1');
  });
});
