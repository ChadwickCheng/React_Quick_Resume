import { useEffect, useState } from 'react';

const App = () => {
  // 1. 没有依赖项 初始 + 组件更新
  const [count, setCount] = useState(0)
  // useEffect(()=>{
  //   console.log('useEffect')
  // })

  // 2. 空数组依赖 初始时执行一次
  // useEffect(()=>{
  //   console.log('useEffect')
  // }, [])

  // 3. 传入特定依赖 初始 + 依赖变化时
  // 有vue监视器的感觉，同时也是一个生命周期函数
  useEffect(()=>{
    console.log('useEffect')
  }, [count])
  return (
    <div>
      <h1>React App</h1>
      <button onClick={()=>{
        setCount(count+1)
      }}> + {count}</button>
    </div>
  )
}

export default App;