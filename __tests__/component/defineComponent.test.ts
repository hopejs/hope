import { getCurrentScope } from '@/activity/makeScopeTree';
import { refresh } from '@/activity/refresh';
import { nextTick } from '@/api';
import { defineComponent } from '@/component';
import { getCurrentElement, h, render } from '@/html';
import { createElement } from '@/renderer';

describe('defineComponent', () => {
  it('basic', () => {
    const com = defineComponent(() => {
      h.div();
    });

    const container = createElement('div', false);
    render(com, container);
    expect(container.innerHTML).toBe('<div></div>');
  });

  it('nest component', () => {
    const parent = defineComponent((children: () => void) => {
      h.div(children);
    });
    const child = defineComponent(() => {
      h.span();
    });

    const container = createElement('div', false);
    render(() => parent(child), container);
    expect(container.innerHTML).toBe('<div><span></span></div>');
  });

  it('activity prop', async () => {
    let text = 'a';
    const parent = defineComponent(() => {
      h.div(() => text);

      refresh(getCurrentScope()!);
    });

    const container = createElement('div', false);
    render(parent, container);
    expect(container.innerHTML).toBe('<div>a</div>');

    text = 'b';
    await nextTick();
    expect(container.innerHTML).toBe('<div>b</div>');
  });

  it('activity nest prop', async () => {
    let text = 'a';
    const parent = defineComponent(() => {
      h.div(() => {
        child({ text: () => text });
      });

      refresh(getCurrentScope()!);
    });
    const child = defineComponent((props: { text: () => string }) => {
      h.span(props.text);
    });

    const container = createElement('div', false);
    render(parent, container);
    expect(container.innerHTML).toBe('<div><span>a</span></div>');

    text = 'b';
    await nextTick();
    expect(container.innerHTML).toBe('<div><span>b</span></div>');
  });

  it('counter', async () => {
    let currentElement: Element;
    const counter = defineComponent(() => {
      let count = 0;
      const handleClick = () => count++;

      h.button({ onClick: handleClick }, () => count);
      currentElement = getCurrentElement()!;
    });

    const container = createElement('div', false);
    render(counter, container);

    expect(container.innerHTML).toBe('<button>0</button>');

    // @ts-ignore
    currentElement.dispatchEvent(new Event('click', { bubbles: true }));
    await nextTick();
    expect(container.innerHTML).toBe('<button>1</button>');
  });
});
