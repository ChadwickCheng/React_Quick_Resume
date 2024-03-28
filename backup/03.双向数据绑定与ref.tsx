/*
受控表单绑定
使用React组件状态控制表单状态 类似于Vue的v-model
1. state绑定到input的value属性
2. input最新的值设置给state
具体实践
  1. 准备状态值
  2. 绑定
  3. onChange

获取dom，不推荐
useRef钩子
  1. 创建ref对象
  2. 绑定到dom的ref属性
  3. dom可用时，通过ref.current获取dom
    1. dom渲染完毕后才可用
*/
import { useState, useRef } from 'react'

const App = () => {
  const [value,setValue] = useState('')

  // ref
  const inputRef = useRef<HTMLInputElement>(null)
  const showDom = ()=>{
    console.log(inputRef.current)
  }

  return (
    <div>
      <h1>hello</h1>
      <input
        type="text"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
      />
      <br />
      {/* ref */}
      <input type="text" ref={inputRef}/>
      <button onClick={showDom}>获取dom</button>
    </div>
  )
}

export default App