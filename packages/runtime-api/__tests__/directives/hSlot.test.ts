import { delay } from '@hopejs/shared';
import { $div, defineComponent, div, hSlot, hText, mount } from '../../src';

describe('hSlot', () => {
  it('basic', async () => {
    const [person, $person] = defineComponent<any, any>(({ slots }) => {
      div();
      slots.default();
      $div();
    });

    person();
    hSlot(() => {
      div();
      $div();
    });
    $person();

    const container = document.createElement('div');
    mount(container);
    await delay();

    expect(container.innerHTML).toBe(
      `<!--component start--><div><div></div></div><!--component end-->`
    );
  });

  it('slot name', async () => {
    const [person, $person] = defineComponent<any, any>(({ slots }) => {
      div();
      slots.first();
      slots.second();
      $div();
    });

    person();
    hSlot('first', () => hText('first'));
    hSlot('second', () => hText('second'));
    $person();

    const container = document.createElement('div');
    mount(container);
    await delay();

    expect(container.innerHTML).toBe(
      '<!--component start--><div>firstsecond</div><!--component end-->'
    );
  });
});
