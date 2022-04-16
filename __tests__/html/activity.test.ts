import { makeScope, refresh } from '@/activity';
import { getCurrentScope } from '@/activity/makeScope';
import { nextTick } from '@/api';
import { getCurrentElement, h, render } from '@/html';

describe('activity tag', () => {
  it('class', async () => {
    let name = 'a';
    let currentElement: Element | null = null;
    render(() =>
      makeScope(() => {
        h.div({ class: () => name });
        currentElement = getCurrentElement();
        expect(currentElement?.outerHTML).toBe(`<div class="a"></div>`);

        refresh(getCurrentScope()!);
      })
    );

    name = 'b';
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div class="b"></div>`);
  });

  it('style with string', async () => {
    let style = `color: red;`;
    let currentElement: Element | null = null;
    render(() =>
      makeScope(() => {
        h.div({ style: () => style });
        currentElement = getCurrentElement();
        expect(getCurrentElement()?.outerHTML).toBe(
          `<div style=\"color: red;\"></div>`
        );

        refresh(getCurrentScope()!);
      })
    );

    style = `color: blue;`;
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div style=\"color: blue;\"></div>`);
  });

  it('style with object', async () => {
    let style = { color: 'red' };
    let currentElement: Element | null = null;
    render(() =>
      makeScope(() => {
        h.div({ style: () => style });
        currentElement = getCurrentElement();
        expect(getCurrentElement()?.outerHTML).toBe(
          `<div style=\"color: red;\"></div>`
        );

        refresh(getCurrentScope()!);
      })
    );

    style = { color: 'blue' };
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div style=\"color: blue;\"></div>`);
  });

  it('style with nest function in object', async () => {
    let color = 'red';
    let currentElement: Element | null = null;
    render(() =>
      makeScope(() => {
        h.div({ style: { color: () => color } });
        currentElement = getCurrentElement();
        expect(getCurrentElement()?.outerHTML).toBe(
          `<div style=\"color: red;\"></div>`
        );

        refresh(getCurrentScope()!);
      })
    );

    color = 'blue';
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div style=\"color: blue;\"></div>`);
  });

  it('DOM prop', async () => {
    let innerHTML = `<span></span>`;
    let currentElement: Element | null = null;
    render(() =>
      makeScope(() => {
        h.div({ innerHTML: () => innerHTML });
        currentElement = getCurrentElement();
        expect(getCurrentElement()?.outerHTML).toBe(`<div><span></span></div>`);

        refresh(getCurrentScope()!);
      })
    );

    innerHTML = `<div></div>`;
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div><div></div></div>`);
  });

  it('attr', async () => {
    let value = `a`;
    let currentElement: Element | null = null;
    render(() =>
      makeScope(() => {
        h.div({ somekey: () => value });
        currentElement = getCurrentElement();
        expect(getCurrentElement()?.outerHTML).toBe(
          `<div somekey=\"a\"></div>`
        );

        refresh(getCurrentScope()!);
      })
    );

    value = `b`;
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div somekey=\"b\"></div>`);
  });

  it('event', async () => {
    let value = `a`;
    let currentElement: Element | null = null;
    render(() =>
      makeScope(() => {
        const scope = getCurrentScope()!;
        const handleClick = () => {
          value = 'b';
          refresh(scope);
        };

        h.div({ somekey: () => value, onClick: handleClick });
        currentElement = getCurrentElement();
        expect(getCurrentElement()?.outerHTML).toBe(
          `<div somekey=\"a\"></div>`
        );
      })
    );

    (currentElement as unknown as Element).dispatchEvent(new Event('click'));
    await nextTick();
    // @ts-ignore
    expect(currentElement.outerHTML).toBe(`<div somekey=\"b\"></div>`);
  });
});
