/*
组件
  1. 不管任何形式的函数，只需要首字母大写

useState
  1. hook函数，向组件添加一个状态变量，数据驱动视图，类似于vue3的数据代理。
  2. 是一个函数，返回一个数组；数组第一个参数是状态变量，第二个参数是setter修改状态变量；useState的参数作为默认初始值。

修改状态规则
  1. 状态不可变：状态只读，修改实际是替换而不是直接原地修改。直接修改不会引发视图更新。具体实践就是，使用setter并count+1，而不是直接count++。
  2. 修改对象，使用全新对象进行替换。具体实践就是，非src.name='xxx', 而是setter({...src, name:'xxx'}).

样式
  1. 行内 不推荐
  2. 类名控制，写css文件，import引入，className添加
*/

import { useState } from "react"
import './App.css'

function Button(){
  return <button>按钮</button>
}

const style = {
  color: 'blue',
  // 多单词写驼峰
  fontSize: '20px'
}

function App() {
  // 解构
  const [count, setCount] = useState(0)
  const handleClick  = ()=>{
    // 新值修改旧值 渲染ui
    setCount(count+1)
  }

  // 对象
  const [form, setForm] = useState({name: 'tom'})
  const handleChange = ()=>{
    setForm({...form, name: 'jerry'})
  }

  return (
    <div>
      <h1>App</h1>
      <Button />
      <br />
      {/* useState */}
      <button onClick={handleClick}>{count}</button>
      <br />
      {/* 对象 */}
      <button onClick={handleChange}>修改form：{form.name}</button>
      <br />
      {/* 行内样式 */}
      <div style={{color: 'red'}}>行内样式</div>
      {/* 抽离的行内 */}
      <div style={style}>抽离的行内</div>
      {/* 类名控制 */}
      <div className="box">类名控制</div>
    </div>
  )
}

export default App