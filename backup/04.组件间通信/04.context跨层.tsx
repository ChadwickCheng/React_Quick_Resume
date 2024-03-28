/*
三步
*/

// 1. 创建上下文对象
import { createContext, useContext } from "react"
const MsgContext = createContext('')

const A = ()=>{
  return (
    <div>
      Component A
      <B/>
    </div>
  )
}

const B = ()=>{
  // 3.
  const msg = useContext(MsgContext)
  return <div>Component B,我获得了顶层app数据：{msg}</div>
}

const App = () => {
  const msg = '最顶层app数据'
  return (
    <div>
      {/* 2. */}
      <MsgContext.Provider value={msg}>
        this is App
        <A/>
      </MsgContext.Provider>
    </div>
  )
}

export default App;