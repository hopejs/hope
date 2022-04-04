import { nextTick } from '@/api';

describe('component', () => {
  it('create a component and mount', async () => {
    function Foo() {
      h.div('hello');
    }

    const container = createElement('div');
    mount(render(Foo), container);
    await nextTick();
    expect(container.innerHTML).toBe('<div>hello</div>');
  });
});
