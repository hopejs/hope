# Hope

一个用原生 JavaScript 编写 UI 的库，支持组件化和基于 [@vue/reactivity](https://github.com/vuejs/vue-next/tree/master/packages/reactivity) 的响应式，且不需要虚拟 DOM，所以整体代码非常精简。状态更新后，直接更新相应 DOM，高性能更新 UI。

## 快速开始

目前仅支持在`script`标签的`src`属性中引入`hope.global.js`，该文件存放在`packages/hope/dist`目录下。所有API都存放在一个全局对象`Hope`中。

例如用`hopejs`写一个 Hello World 是这样的：
```javascript
const { div, $div, hText } = Hope

div()
  hText('hello hope!')
$div()

mount(document.body)
```

不要怀疑，虽然上面的写法有些“古怪”，不过这可是纯原生 JavaScript ！

我把 html 的版本写出来对比一下就很容易看明白：
```
// html 版本
<div>
  hello hope!
</div>

// hopejs 版本
div()
  hText('hello hope!')
$div()
```

怎么样，是不是很相似？这是我故意模仿 html 的语法设计的，便于使用者的理解，降低学习成本。

## 用 JavaScript 编写 HTML

用 js 写 HTML 的好处是可以实现模块化，响应式，组件化开发页面，相比 HTML 更灵活。虽然有这些好处，但如何用 js 写 HTML 是个难题。可以用函数传参的形式，类似于虚拟 DOM 中的 h 函数。

```js
// 描述一个 div 元素
h('div', props, ...children);
```

如上所示，单个函数的形式可以完备的描述一个 DOM 树的整体结构，但当 DOM 树比较复杂时，这种写法的可读性比较低，写起来也不方便，对习惯了 HTML 语法的初学者来说不是很友好。

于是我想到了下面的这种类似于 HTML 语法的写法。

```js
const { div, $div, hText } = Hope

// 描述一个 div 元素
div()
  hText('hello')
$div()
```

上面的这种写法比较类似于 HTML 的语法，有“开始标签”和“结束标签”，并且还可以在“标签”之间写其它的元素，如下所示：

```js
// 描述一个拥有一个 span 子元素的 div 元素
div()
  span()
  $span()
$div()

// HTML 版本
<div>
  <span>
  </span>
</div>
```

通过上面简单的比较，可以发现这种写法像 HTML 的写法，所以对习惯 HTML 语法的初学者来说比较容易入门，在写复杂的 DOM 结构的时候也会像 HTML 一样富有层次感。以后还会支持**自动缩进**和**语法补全**（通过 vscode 插件支持）。

### HTML attribute 和 DOM property

如何设置元素的 class 或者 DOM 的属性呢？

请看下面的例子：

```js
// 设置 div 的 class name
div({ class: 'class-name' })
  hText('hello')
$div()

// HTML 版本
<div class="class-name">
  hello
</div>
```

可以看出，我是尽可能的模仿 HTML 的语法，便于更快的上手使用。有一点与 HTML 不同的是 hopejs 会自动判断设置的属性是 attribute 还是 property，所以如果想设置 DOM 元素的 property，也可以直接写到开始标签参数中。

例如：
```js
// 设置 div 的 innerHTML 属性
div({ innerHTML: 'hello hope!' })
  hText('hello')
$div()

// HTML 这样写是无效的，并不会设置其 DOM 元素的 innerHTML
<div innerHTML="hello hope!">
  hello
</div>
```

### 绑定事件

如何绑定事件呢，很简单，如下所示：

```js
// 绑定 div 的 click 事件，'on' 后面的首字母需要大写
div({ onClick: () => console.log('Say hello!') })
  hText('hello')
$div()

// HTML 版本，'on' 后面的首字母不需要大写
<div onclick="hello hope!">
  hello
</div>
```

这里要注意 `onClick` 中的 `Click` 的首字母是需要大写的，其底层使用的是 DOM 元素的 `addEventListener` 属性设置的。

## 组件

前端的组件化已经深入人心，所以 hopejs 也支持组件化开发。hopejs 暴露的有一个生成组件的 API：`defineComponent`，用该 API 可以封装自己的组件。

```js
const { defineComponent, div, $div, hText, s } = Hope

// 接收一个函数作为参数，在该函数中书写该组件的 HTML 结构和 CSS 样式
const [com, $com] = defineComponent(({ props, slot, emit }) => {
  // 直接写 “HTML"，不用 return
  div({ class: 'class-name' })
    hText('Hello Component!')
  $div()

  // hopejs 暴露了一个 s 接口，s 是 style 的缩写，用来写 CSS
  // 该语法也是模仿的 CSS 的语法，CSS 的版本是这样的：
  // .class-name {
  //   width: 100px;
  //   height: 100px;
  // }
  s('.class-name', {
    width: '100px',
    height: '100px'
  })
})

// 然后就像普通标签一样使用组件
com()
$com()

// 最后需要挂在到 DOM 树中
mount(document.body)
```

### 生命周期

在组件中可以使用三个生命周期函数，分别是：

#### onMounted

当组件被挂在到 DOM 树中时被触发。

#### onUnmounted

当组件被卸载时触发该生命周期函数。

#### onUpdated

当组件的视图更新时触发该生命周期函数。

### 事件

我比较喜欢 `单向数据流` 的概念，父组件与子组件通过子组件的 props 通信，子组件与父组件通过发出一个事件的方式进行通信，这样的代码更易于维护。

在 hopejs 中组件也可以发出一个事件，供用户使用的时候监听该事件，处理一些逻辑。事件是通过 `emit` 在组件中发出的。

```js
const { defineComponent, div, $div, hText, s } = Hope

const [com, $com] = defineComponent(({ props, slot, emit }) => {
  const handler = () => {
    // 使用 emit 发出一个事件
    emit('clickText', '这里可以传参数')
  }

  // 监听组件根元素的 click 事件
  div({ onClick: handler })
    hText('Hello Component!')
  $div()
})

// 监听事件时注意字母的大小写，必须要 'on' 开头
com({ onClickText: (param) => console.log(param) })
$com()

// 最后需要挂在到 DOM 树中
mount(document.body)
```

### 插槽

插槽在组件中也是很重要的，可以更灵活的使用组件。现在来看一下 hopejs 中组件的插槽是如何实现的。

```js
const { defineComponent, div, $div, hText, hSlot, s } = Hope

const [com, $com] = defineComponent(({ props, slot, emit }) => {
  // 通过 slot 参数，在组件中可以获取到插入到组件中的插槽，
  // 所谓插槽就是一个函数，直接在某个位置上调用即可，default
  // 表示的是没有提供具体名字的插槽，如果提供了具体的名字，
  // 则需要更改为那个具体的名字，如 slot.name()
  div()
    slot.default()
  $div()
})

// 使用组件时，需要通过 hSlot 指令来指定组件的插槽
com()
  hSlot(() => {
    div()
      hText('这里是插槽中的内容')
    $div()
  })
$com()

// 也可以指定插槽的名字，使用时这样用 slot.name()
com()
  hSlot('name', () => {
    div()
      hText('这里是插槽中的内容')
    $div()
  })
$com()

// 最后需要挂在到 DOM 树中
mount(document.body)
```

## 更新 DOM 树的结构

有时候我们会根据某个状态值的不同，去显示不同的 DOM 结构，比如根据路由的不同渲染不同的组件。hopejs 提供了 `block` API 来进行 DOM 树的结构更新。如下所示：

```js
const { div, $div, hText, reactive, block } = Hope
const state = reactive({ show: true })

div()
  // 在 block 中声明 DOM 结构与状态之间的关系，
  // 当状态更新时，DOM 树结构也会自动进行更新
  block(() => {
    if (state.show) {
      hText('show 为 true 时显示')
    } else {
      hText('show 为 false 时显示')
    }
  })
$div()
```

## 响应式

响应式在现在的前端开发中已经是不可缺少的一部分了，它极大的简化了前端页面的开发难度。来看一下 hopejs 的响应式是怎么写的。

```js
const { div, $div, reactive } = Hope
const state = reactive({ color: 'red' })

// HTML
// 在 hopejs 中，只要把属性的值写成函数的形式，并返回，
// 当状态值更改时，对应的 UI 也会自动更新
div({style: {
  color: () => state.color
}})
$div()

// 挂在到 DOM 树
mount(document.body)
```

可以看到，在 hopejs 中响应式需要满足**两个条件**，一个是响应式对象，就是用 reactive API 生成的对象，一个是**属性值是一个返回状态值的函数**，这两个条件缺一不可，否则就不会状态值更改时自动更新 UI。

# Demos

demo1: [elastic-header](https://hopejs.github.io/hope/demos/elastic-header/index.html)

demo2: [markdown](https://hopejs.github.io/hope/demos/markdown/index.html)

demo3: [todomvc](https://hopejs.github.io/hope/demos/todomvc/index.html)
