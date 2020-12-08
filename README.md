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

## 指令

指令是用来设置 DOM 元素的属性和事件的一系列函数，用户还可以通过 hopejs 暴露出来的 API 自定义指令函数。指令只能在开始标签函数和闭合标签函数中间使用，如上面 hello world 示例中的 hText。

**目前的指令有：**

### hText

用来生成文本节点的指令。

**用法示例：**

```js
const { div, $div, hText } = Hope

div()
  hText('hello hope!')
$div()

mount(document.body)
```
**响应式示例：**
```js
const { div, $div, hText, reactive } = Hope
const state = reactive({ text: 'hello hope!' })

div()
  // hText 的值必须是函数，并返回一个用 reactive 创建的响应式对象
  hText(() => state.text)
$div()

mount(document.body)

// 重新更改状态值 UI 会自动高效更新，
// 其响应式原理请看 https://github.com/vuejs/vue-next/tree/master/packages/reactivity
state.text = 'hello world!'
```

如上所示，指令函数的参数必须是一个返回响应式对象（也就是用 reactive 创建的对象）的函数，UI 才会是响应式的！

### hAttr

使用 `setAttribute` 设置 DOM 元素的属性。

**用法示例：**
```js
const { div, $div, hAttr } = Hope

div()
  hAttr({ class: 'class-name' })
$div()

mount(document.body)
```

**响应式示例：**

```js
const { div, $div, hAttr, reactive } = Hope
const state = reactive({ className: 'class-name' })

div()
  hAttr({ class: () => state.className })
$div()

mount(document.body)

// 重新更改状态值 UI 会自动高效更新，
// 其响应式原理请看 https://github.com/vuejs/vue-next/tree/master/packages/reactivity
state.className = 'hope'
```

### hProp

直接设置 DOM 元素对象的属性，于 hAttr 不同。此指令也可以用在组件中。

**用法示例：**

```js
const { div, $div, hProp } = Hope

div()
  hProp({ innerHTML: 'hello hope!' })
$div()

mount(document.body)
```

**响应式示例：**

```js
const { div, $div, hProp, reactive } = Hope
const state = reactive({ html: 'hello hope!' })

div()
  hProp({ innerHTML: () => state.html })
$div()

mount(document.body)

// 重新更改状态值 UI 会自动高效更新，
// 其响应式原理请看 https://github.com/vuejs/vue-next/tree/master/packages/reactivity
state.html = 'hello world!'
```

### hClass

设置 DOM 的 class 属性。

**用法示例：**

1，基础用法

```js
const { div, $div, hClass } = Hope

div()
  hClass('class-name')
$div()

mount(document.body)
```

2，对象用法
```js
const { div, $div, hClass } = Hope

div()
  hClass({ 'class-name': true })
$div()

mount(document.body)
```

3，数组用法
```js
const { div, $div, hClass } = Hope
const class1 = { 'class-name-1': true }
const class2 = { 'class-name-2': true }

div()
  hClass([class1, class2])
$div()

mount(document.body)
```

**响应式示例：**

```js
const { div, $div, hClass, reactive } = Hope
const state = reactive({ isActive: true })

div()
  // 把上面的写成函数形式就会变成响应式的
  hClass(() => ({ active: state.isActive }))
$div()

mount(document.body)

// 重新更改状态值 UI 会自动高效更新，
// 其响应式原理请看 https://github.com/vuejs/vue-next/tree/master/packages/reactivity
state.isActive = false
```

### hStyle

设置 DOM 的 style 属性。

1，基础用法

```js
const { div, $div, hStyle } = Hope

div()
  hStyle({ color: 'red' })
$div()

mount(document.body)
```

2，数组用法

```js
const { div, $div, hStyle } = Hope
const style1 = { width: '100px' }
const style2 = { height: '100px' }

div()
  hStyle([style1, style2])
$div()

mount(document.body)
```
3，自动添加前缀

在 hStyle 中使用需要 (浏览器引擎前缀) [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) 的 CSS property 时，如 transform，Hopejs 将自动侦测并添加相应的前缀。

4，多重值

```js
div()
  hStyle({ display: ['-webkit-box', '-ms-flexbox', 'flex'] })
$div()
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

### hId

设置 DOM 元素的 id 属性。

**用法示例：**

```js
const { div, $div, hId } = Hope

div()
  hId('id-name')
$div()

mount(document.body)
```

**响应式示例：**

```js
const { div, $div, hId, reactive } = Hope
const state = reactive({ id: 'id-name' })

div()
  hId(() => state.id)
$div()

mount(document.body)

// 重新更改状态值 UI 会自动高效更新，
// 其响应式原理请看 https://github.com/vuejs/vue-next/tree/master/packages/reactivity
state.id = 'hope'
```

### hOn

设置 DOM 的事件监听器，也可以用在组件中。

**用法示例：**

```js
const { div, $div, hOn } = Hope

const handle = () => console.log('click')

div()
  hOn('click', handle)
$div()

mount(document.body)
```

### hShow

控制 DOM 元素的显示和隐藏，该指令会保持 DOM 元素的状态，不会直接销毁 DOM 元素。

**用法示例：**

```js
const { div, $div, hShow } = Hope

div()
  hShow(true)
$div()

mount(document.body)
```

**响应式示例：**

```js
const { div, $div, hShow, reactive } = Hope

const state = reactive({ show: true })

div()
  hShow(() => state.show)
$div()

mount(document.body)

// 上面的 div 元素会被隐藏，但不会销毁
state.show = false
```

### hComment

生成一个注释节点。

### hSlot

设置组件的插槽。

**用法示例：**

```js
const { div, $div, hText, defineComponent } = Hope
// 创建一个组件
const [com, $com] = defineComponent(() => {...})

com()
  hSlot(() => {
    div()
      hText('作为插槽在组件内部渲染')
    $div()
  })
$com()

mount(document.body)
```

## 结构化响应式更新 block

上面的指令只会更新 DOM 元素内部的属性，如果想对元素进行结构性更新可以使用 block API。

**用法示例：**

```js
const { div, $div, block, hText } = Hope
const state = reactive({ toggle: true })

block(() => {
  if (state.toggle) {
    div()
      hText('当 toggle 为 true 时会渲染该元素，下面的元素不会被渲染')
    $div()
  } else {
    div()
      hText('当 toggle 为 false 时会渲染该元素，上面的元素会被销毁')
    $div()
  }
})

mount(document.body)

// UI 会自动更新
state.toggle = false
```

## 定义一个组件 defineComponent

**用法示例：**

```js
const { div, $div, span, $span, hOn, hText, hProp, hSlot, defineComponent, reactive, onMounted, onUnmounted, onUpdated, s } = Hope

// 创建一个组件
const Com = defineComponent(({ props, slots, emit }) => {
    const state = reactive({ color: 'red' })
    const clickHandle = () => {
      // 自定义一个组件的事件，使用组件时可以使用 hOn 指令监听
      emit('comClick', '事件参数')
    }

    // 组件的生命周期钩子，在组件渲染完毕时触发
    onMounted(() => {...})
    // 组件卸载时触发
    onUnmounted(() => {...})
    // 组件视图更新时触发
    onUpdated(() => {...})

    // 设置 div 的 calss
    div({ class: 'class-name' })
      // 定义默认插槽的渲染位置
      slots.default()
      hOn('click', clickHandle)
      // 可以接收用户使用组件时，传进来的 props
      hText(() => props.text)
    $div()

    // 可以直接在 js 中写 css
    s('.class-name', {
      width: '100px',
      height: '100px',
      // 写成函数的形式就会变成响应式的，且更新非常高效
      backgroundColor: () => state.color
    })
})

// 定义好之后的组件可以直接挂载到 DOM
Com.mount(document.body)

// 也可以与其它一起使用，用法如下：
const [com, $com] = Com

div()
  com()
    hProp({ text: '设置组件的 props' })
    // 编写组件的默认插槽
    hSlot(() => {
      span()
      $span()
    })
  $com()
$div()

// 然后挂载
mount(document.body)
```