import { makeScope, refresh } from '@/activity';
import { nextTick } from '@/api';
import { getCurrentElement, h } from '@/html';

describe('activity tag', () => {
  it('class', async () => {
    let name = 'a';
    makeScope(() => {
      h.div({ class: () => name });
      expect(getCurrentElement()?.outerHTML).toBe(`<div class="a"></div>`);

      refresh();
    });

    name = 'b';
    await nextTick();
    expect(getCurrentElement()?.outerHTML).toBe(`<div class="b"></div>`);
  });

  it('style with string', async () => {
    let style = `color: red;`;
    makeScope(() => {
      h.div({ style: () => style });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div style=\"color: red;\"></div>`
      );

      refresh();
    });

    style = `color: blue;`;
    await nextTick();
    expect(getCurrentElement()?.outerHTML).toBe(
      `<div style=\"color: blue;\"></div>`
    );
  });

  it('style with object', async () => {
    let style = { color: 'red' };
    makeScope(() => {
      h.div({ style: () => style });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div style=\"color: red;\"></div>`
      );

      refresh();
    });

    style = { color: 'blue' };
    await nextTick();
    expect(getCurrentElement()?.outerHTML).toBe(
      `<div style=\"color: blue;\"></div>`
    );
  });

  it('style with nest function in object', async () => {
    let color = 'red';
    makeScope(() => {
      h.div({ style: { color: () => color } });
      expect(getCurrentElement()?.outerHTML).toBe(
        `<div style=\"color: red;\"></div>`
      );

      refresh();
    });

    color = 'blue';
    await nextTick();
    expect(getCurrentElement()?.outerHTML).toBe(
      `<div style=\"color: blue;\"></div>`
    );
  });

  it('DOM prop', async () => {
    let innerHTML = `<span></span>`;
    makeScope(() => {
      h.div({ innerHTML: () => innerHTML });
      expect(getCurrentElement()?.outerHTML).toBe(`<div><span></span></div>`);

      refresh();
    });

    innerHTML = `<div></div>`;
    await nextTick();
    expect(getCurrentElement()?.outerHTML).toBe(`<div><div></div></div>`);
  });

  it('attr', async () => {
    let value = `a`;
    makeScope(() => {
      h.div({ somekey: () => value });
      expect(getCurrentElement()?.outerHTML).toBe(`<div somekey=\"a\"></div>`);

      refresh();
    });

    value = `b`;
    await nextTick();
    expect(getCurrentElement()?.outerHTML).toBe(`<div somekey=\"b\"></div>`);
  });
});
