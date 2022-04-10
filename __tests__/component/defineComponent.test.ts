import { refresh } from '@/activity';
import { nextTick } from '@/api';
import { defineComponent } from '@/component';
import { h, mount, render } from '@/html';
import { createElement } from '@/renderer';

describe('defineComponent', () => {
  it('basic', () => {
    const com = defineComponent(() => {
      h.div();
    });

    const container = createElement('div', false);
    mount(render(com), container);
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
    mount(
      render(() => parent(child)),
      container
    );
    expect(container.innerHTML).toBe('<div><span></span></div>');
  });

  it('activity prop', async () => {
    let text = 'a';
    const parent = defineComponent(() => {
      h.div(() => text);

      refresh();
    });

    const container = createElement('div', false);
    mount(render(parent), container);
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

      refresh();
    });
    const child = defineComponent((props: { text: () => string }) => {
      h.span(props.text);
    });

    const container = createElement('div', false);
    mount(render(parent), container);
    expect(container.innerHTML).toBe('<div><span>a</span></div>');

    text = 'b';
    await nextTick();
    expect(container.innerHTML).toBe('<div><span>b</span></div>');
  });
});
