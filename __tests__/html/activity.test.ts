import { getCurrentScope, makeScopeTree } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { nextTick } from '@/api';
import { getCurrentElement, h, render } from '@/html';
import { createElement } from '@/renderer';

describe('activity tag', () => {
  it('class', async () => {
    let name = 'a';
    let currentElement: Element | null = null;
    render(
      () =>
        makeScopeTree(() => {
          h.div({ class: () => name });
          currentElement = getCurrentElement();
          expect(currentElement?.outerHTML).toBe(`<div class="a"></div>`);

          refresh(getCurrentScope()!);
        }),
      createElement('div', false)
    );

    name = 'b';
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div class="b"></div>`);
  });

  it('style with string', async () => {
    let style = `color: red;`;
    let currentElement: Element | null = null;
    render(
      () =>
        makeScopeTree(() => {
          h.div({ style: () => style });
          currentElement = getCurrentElement();
          expect(getCurrentElement()?.outerHTML).toBe(
            `<div style=\"color: red;\"></div>`
          );

          refresh(getCurrentScope()!);
        }),
      createElement('div', false)
    );

    style = `color: blue;`;
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div style=\"color: blue;\"></div>`);
  });

  it('style with object', async () => {
    let style = { color: 'red' };
    let currentElement: Element | null = null;
    render(
      () =>
        makeScopeTree(() => {
          h.div({ style: () => style });
          currentElement = getCurrentElement();
          expect(getCurrentElement()?.outerHTML).toBe(
            `<div style=\"color: red;\"></div>`
          );

          refresh(getCurrentScope()!);
        }),
      createElement('div', false)
    );

    style = { color: 'blue' };
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div style=\"color: blue;\"></div>`);
  });

  it('style with nest function in object', async () => {
    let color = 'red';
    let currentElement: Element | null = null;
    render(
      () =>
        makeScopeTree(() => {
          h.div({ style: { color: () => color } });
          currentElement = getCurrentElement();
          expect(getCurrentElement()?.outerHTML).toBe(
            `<div style=\"color: red;\"></div>`
          );

          refresh(getCurrentScope()!);
        }),
      createElement('div', false)
    );

    color = 'blue';
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div style=\"color: blue;\"></div>`);
  });

  it('DOM prop', async () => {
    let innerHTML = `<span></span>`;
    let currentElement: Element | null = null;
    render(
      () =>
        makeScopeTree(() => {
          h.div({ innerHTML: () => innerHTML });
          currentElement = getCurrentElement();
          expect(getCurrentElement()?.outerHTML).toBe(
            `<div><span></span></div>`
          );

          refresh(getCurrentScope()!);
        }),
      createElement('div', false)
    );

    innerHTML = `<div></div>`;
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div><div></div></div>`);
  });

  it('attr', async () => {
    let value = `a`;
    let currentElement: Element | null = null;
    render(
      () =>
        makeScopeTree(() => {
          h.div({ somekey: () => value });
          currentElement = getCurrentElement();
          expect(getCurrentElement()?.outerHTML).toBe(
            `<div somekey=\"a\"></div>`
          );

          refresh(getCurrentScope()!);
        }),
      createElement('div', false)
    );

    value = `b`;
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div somekey=\"b\"></div>`);
  });

  it('event', async () => {
    let value = `a`;
    let currentElement: Element | null = null;
    render(
      () =>
        makeScopeTree(() => {
          const handleClick = () => {
            value = 'b';
          };

          h.div({ somekey: () => value, onClick: handleClick });
          currentElement = getCurrentElement();
          expect(getCurrentElement()?.outerHTML).toBe(
            `<div somekey=\"a\"></div>`
          );
        }),
      createElement('div', false)
    );

    (currentElement as unknown as Element).dispatchEvent(new Event('click'));
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div somekey=\"b\"></div>`);
  });
});
