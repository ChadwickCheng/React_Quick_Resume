/*
清除副作用
*/
import { useEffect, useState } from 'react';

const Son = () => {
  // 1. 渲染时开启定时器
  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log('setInterval')
    }, 1000)
    return ()=>{
      // 2. 卸载时清除定时器
      clearInterval(timer)
    }
  }, [])
  return (
    <div>
      <h1>son</h1>
    </div>
  )
}

const App = () => {
  const [show, setShow] = useState(true)
  return (
    <div>
      {show && <Son />}
      <button onClick={()=>setShow(false)}>卸载son组件</button>
    </div>
  )
}

export default App;