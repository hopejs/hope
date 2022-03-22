import { delay } from '@/shared';
import { div, $div, mount } from '@/api';

describe('mount', () => {
  it('basic', async () => {
    div();
    $div();
    const container = document.createElement('div');
    mount(container);
    // 真正的挂在是在下一个循环开始
    await delay();
    expect(container.innerHTML).toBe('<div></div>');
  });
});
