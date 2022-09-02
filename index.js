const React = (function () {
  let hooks = [];
  let i = 0;
  function useState(initVal) {
    const state = hooks[i] || initVal;
    const _i = i
    const setState = (newVal) => {
      hooks[_i] = newVal;
    };
    i++;
    return [state, setState];
  }

  function render(Component) {
      i =0
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    typeText: (word) => setText(word),
  };
}

var App = React.render(Component);
App.click();
App.typeText("watermelon");
var App = React.render(Component);
App.click();
var App = React.render(Component);
App.click();
