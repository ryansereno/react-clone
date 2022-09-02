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
      console.log("hook array= ", hooks)
    return C;
  }
    function useEffect(callback, dependencyArray){
        const oldDependencies = hooks[i]
        let hasChanged = true
        if (oldDependencies){
            hasChanged = dependencyArray.some(
                (dep, indx) => !Object.is(dep, oldDependencies[indx])
            )
        }
        if (hasChanged){
            callback()
        }
        hooks[i] = dependencyArray
        i++
    }

  return { useState, render, useEffect };
})();

function Component() {
  const [text, setText] = React.useState("apple");
  const [fruit, setFruit] = React.useState("🍍");
  const [count, setCount] = React.useState(1);

    React.useEffect(() =>{
        console.log('effect triggered')
    }, [count,fruit])

  return {
    render: () => console.log({ count, text, fruit }),
    click: () => setCount(count + 1),
    typeText: (word) => setText(word),
    typeFruit: (fruit) => setFruit(fruit),
  };
}

var App = React.render(Component);
App.typeText("watermelon");
App.click();

var App = React.render(Component);
App.typeText("lemon");
App.typeFruit("🍓")
App.click();

var App = React.render(Component);

