import { h, mount, render } from '@/html';
import { createElement } from '@/renderer';

describe('mount', () => {
  it('create a component and mount', () => {
    function Foo() {
      h.div();
    }

    const container = createElement('div', false);
    mount(render(Foo), container);
    expect(container.innerHTML).toBe('<div></div>');
  });
});
