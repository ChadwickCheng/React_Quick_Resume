import { useState } from "react";

function useToggle(){
  const [value, setValue] = useState(true);
  const toggle = () => setValue(!value);
  return {value, toggle};
}
/*
函数名use开头
内部封装可复用逻辑
返回值是一个对象
别的组件使用时执行并解构
*/

const App = () => {
  const {value, toggle} = useToggle();
  return (
    <div>
      {value && <div>App</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  )
}

export default App;