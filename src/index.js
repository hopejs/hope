function button(props) {
  const dom = document.createElement('button');
  Object.keys(props).forEach((key) => {
    if (key === 'onClick') {
      return dom.addEventListener('click', props[key]);
    }
    dom[key] = props[key];
  });
  return dom;
}

/**
 * View
 * state <<-> view
 */
function Button({ number, onClick }) {
  const [value, setValue] = useState(number)
  const handleClick = () => {
    const result = ++value
    setValue(result)
    onClick(result)
  }

  return button({ innerText: value, onClick: handleClick });
}

function State({result}) {
  function handleClick() {
    this.innerText = ++result
  }

  return {
    number: result,
    onClick: handleClick
  }
}

document.querySelector('#app').appendChild(Button(State({result: 1})));

/**
 * 1.建立连接
 * 2.注册事件
 * 3.执行副作用
 */
