import { getCurrentElement, HopeElement, nextTick } from '@hopejs/runtime-core';
import { reactive } from '@hopejs/reactivity';
import { hComment, div, $div, block } from '../../src';

describe('hComment', () => {
  it('basic', () => {
    div();
    hComment('');
    expect(getCurrentElement()?.innerHTML).toBe('<!---->');
    $div();
  });

  it('reactivity', async () => {
    const state = reactive({ name: 'a' });

    div();
    hComment(() => state.name);
    const el = getCurrentElement();
    expect(el?.innerHTML).toBe(`<!--a-->`);
    $div();

    state.name = 'b';
    await nextTick();
    expect(el?.innerHTML).toBe(`<!--b-->`);
  });

  it('_hope_effects', () => {
    let el: HopeElement;
    block(() => {
      div();
      hComment(() => 'name');
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects?.size).toBe(1);
  });

  it('_hope_effects & no reactivity', () => {
    let el: HopeElement;
    block(() => {
      div();
      hComment('name');
      el = getCurrentElement()!;
      $div();
    });

    // @ts-ignore
    expect(el._hope_effects).toBe(undefined);
  });
});
