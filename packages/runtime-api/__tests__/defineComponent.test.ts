import { reactive } from '@hopejs/reactivity';
import { getCurrentElement, nextTick } from '@hopejs/runtime-core';
import {
  $div,
  defineComponent,
  div,
  hProp,
  hText,
  hSlot,
  mount,
  hOn,
  block,
  onMounted,
  onUnmounted,
  onUpdated,
} from '../src';

describe('defineComponent', () => {
  it('basic', () => {
    const [helloWorld, $helloWorld] = defineComponent(() => {
      div();
      hText('Hello World');
      $div();
    });

    const container = document.createElement('div');
    helloWorld();
    $helloWorld();
    mount(container);
    expect(container.innerHTML).toBe(
      `<!--component start--><div>Hello World</div><!--component end-->`
    );
  });

  it('mount', () => {
    const HelloWorld = defineComponent(() => {
      div();
      hText('Hello Hope');
      $div();
    });

    const container = document.createElement('div');
    HelloWorld.mount(container);
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
    expect(container.innerHTML).toBe(
      `<!--component start--><div>a</div><!--component end-->`
    );

    p.name = 'b';
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--component start--><div>b</div><!--component end-->`
    );
  });

  it('slots', () => {
    const [person, $person] = defineComponent<any, any>(({ slots }) => {
      div();
      slots.default();
      $div();
    });

    person();
    hSlot('default', () => {
      div();
      $div();
    });
    $person();

    const container = document.createElement('div');
    mount(container);
    expect(container.innerHTML).toBe(
      `<!--component start--><div><div></div></div><!--component end-->`
    );
  });

  it('emit', () => {
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

    // @ts-ignore
    el.dispatchEvent(new CustomEvent('click'));
    expect(fn).toBeCalledTimes(1);
  });

  it('lifecycle', async () => {
    const mounted = jest.fn();
    const unmounted = jest.fn();
    const updated = jest.fn();
    const state = reactive({ text: 'a', show: true });

    const [com, $com] = defineComponent<any, any>(({ props }) => {
      onMounted(mounted);
      onUnmounted(unmounted);
      onUpdated(updated);

      div();
      hText(() => props.text);
      $div();
    });

    block(() => {
      if (state.show) {
        com();
        hProp('text', () => state.text);
        $com();
      }
    });

    const container = document.createElement('div');
    mount(container);
    expect(container.innerHTML).toBe(
      `<!--block start--><!--component start--><div>a</div><!--component end--><!--block end-->`
    );
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(1);

    state.text = 'b';
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--block start--><!--component start--><div>b</div><!--component end--><!--block end-->`
    );
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(2);

    state.text = 'c';
    state.text = 'd';
    await nextTick();
    expect(container.innerHTML).toBe(
      `<!--block start--><!--component start--><div>d</div><!--component end--><!--block end-->`
    );
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(0);
    expect(updated).toBeCalledTimes(3);

    state.show = false;
    await nextTick();
    expect(container.innerHTML).toBe(`<!--block start--><!--block end-->`);
    expect(mounted).toBeCalledTimes(1);
    expect(unmounted).toBeCalledTimes(1);
    expect(updated).toBeCalledTimes(3);
  });

  it('block & component', () => {
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
    expect(container.innerHTML).toBe(
      `<!--block start--><div></div><!--component start--><div>b</div><!--component end--><!--block end-->`
    );
  });

  it('nest block & component', () => {
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
    expect(container2.innerHTML).toBe(
      `<!--block start--><div><!--block start--><div></div><!--block end--><!--component start--><div></div><!--component end--></div><!--block end-->`
    );
  });
});
