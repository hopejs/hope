function Button(text) {
  const dom = document.createElement('button');
  dom.innerText = text;
  return dom;
}

document.querySelector('#app').appendChild(Button(1));
