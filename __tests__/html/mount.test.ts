import { h, render } from '@/html';
import { createElement } from '@/renderer';

describe('mount', () => {
  it('create a component and mount', () => {
    function Foo() {
      h.div();
    }

    const container = createElement('div', false);
    render(Foo, container);
    expect(container.innerHTML).toBe('<div></div>');
  });

  it('nest', () => {
    function Foo() {
      h.div(() => {
        h.span('hello hope!');
      });
    }

    const container = createElement('div', false);
    render(Foo, container);
    expect(container.innerHTML).toBe('<div><span>hello hope!</span></div>');
  });

  it('nest, setting attr on parent', () => {
    function Foo() {
      h.div(
        { class: 'class-name', style: { fontSize: '12px', color: 'black' } },
        () => {
          h.span('hello hope!');
        }
      );
    }

    const container = createElement('div', false);
    render(Foo, container);
    expect(container.innerHTML).toBe(
      '<div class="class-name" style="font-size: 12px; color: black;"><span>hello hope!</span></div>'
    );
  });

  it('nest, setting attr on child', () => {
    function Foo() {
      h.div(() => {
        h.span(
          { class: 'class-name', style: { fontSize: '12px', color: 'black' } },
          'hello hope!'
        );
      });
    }

    const container = createElement('div', false);
    render(Foo, container);
    expect(container.innerHTML).toBe(
      '<div><span class="class-name" style="font-size: 12px; color: black;">hello hope!</span></div>'
    );
  });
});
