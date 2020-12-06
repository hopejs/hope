import { reactive } from '@hopejs/reactivity';
import { getCurrentElement, nextTick } from '@hopejs/runtime-core';
import { delay } from '@hopejs/shared';
import {
  $div,
  defineComponent,
  div,
  hProp,
  hText,
  mount,
  hOn,
  block,
} from '../src';

describe('defineComponent', () => {
  it('basic', async () => {
    const [helloWorld, $helloWorld] = defineComponent(() => {
      div();
      hText('Hello World');
      $div();
    });

    const container = document.createElement('div');
    helloWorld();
    $helloWorld();
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>Hello World</div><!--component end-->`
    );
  });

  it('mount', async () => {
    const HelloWorld = defineComponent(() => {
      div();
      hText('Hello Hope');
      $div();
    });

    const container = document.createElement('div');
    HelloWorld.mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>Hello Hope</div><!--component end-->`
    );
  });

  it('props', async () => {
    const p = reactive({ name: 'a' });
    const [person, $person] = defineComponent<any, any>(({ props }) => {
      div();
      hText(() => props.name);
      $div();
    });

    person();
    hProp('name', () => p.name);
    $person();

    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>a</div><!--component end-->`
    );

    p.name = 'b';
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>b</div><!--component end-->`
    );
  });

  it('emit', async () => {
    let el: Element;
    const [person, $person] = defineComponent<any, any>(({ emit }) => {
      div();
      hOn('click', () => {
        emit && emit('testClick', 123);
      });
      el = getCurrentElement()!;
      $div();
    });

    const fn = jest.fn((arg) => {
      expect(arg).toBe(123);
    });

    person();
    hOn('testClick', fn);
    $person();

    const container = document.createElement('div');
    mount(container);
    await delay();

    // @ts-ignore
    el.dispatchEvent(new CustomEvent('click'));
    expect(fn).toBeCalledTimes(1);
  });

  it('block & component', async () => {
    const [com, $com] = defineComponent<any, any>(({ props }) => {
      div();
      hText(() => props.a);
      $div();
    });
    block(() => {
      div();
      $div();
      com();
      hProp('a', () => 'b');
      $com();
    });
    const container = document.createElement('div');
    mount(container);
    await delay();
    expect(container.innerHTML).toBe(
      `<!--block start--><div></div><!--component start--><div>b</div><!--component end--><!--block end-->`
    );
  });

  it('nest block & component', async () => {
    const [com, $com] = defineComponent<any, any>(() => {
      div();
      $div();
    });
    block(() => {
      div();
      block(() => {
        com();
        $com();
      });
      $div();
    });
    const container1 = document.createElement('div');
    mount(container1);
    await delay();
    expect(container1.innerHTML).toBe(
      `<!--block start--><div><!--block start--><!--component start--><div></div><!--component end--><!--block end--></div><!--block end-->`
    );

    block(() => {
      div();
      block(() => {
        div();
        $div();
      });
      com();
      $com();
      $div();
    });
    const container2 = document.createElement('div');
    mount(container2);
    await delay();
    expect(container2.innerHTML).toBe(
      `<!--block start--><div><!--block start--><div></div><!--block end--><!--component start--><div></div><!--component end--></div><!--block end-->`
    );
  });
});
