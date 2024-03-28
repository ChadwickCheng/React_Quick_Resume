/*
useEffect 类似于vue的mounted生命周期函数，当组件挂载到DOM中时，useEffect会执行一次
在组件中创建不是由事件引起还是渲染本身引起的操作
比如组件渲染完毕自动发送axios请求，或者是组件渲染完毕自动获取DOM元素的宽高等

需求：组件渲染完毕立即获取数据
useEffect(() => {}, [])
参数1：回调函数，组件渲染完毕后立即执行
可选参数2：数组放置依赖项，不同依赖项会影响第一个回调的执行，空数组时，回调会在组件挂载时执行一次

http://geek.itheima.net/v1_0/channels
*/
import { useEffect, useState } from 'react';

const url = 'http://geek.itheima.net/v1_0/channels';

const App = () => {
  const [List, setList] = useState([])
  useEffect(()=>{
    (async function (){
      const res = await fetch(url)
      const list = await res.json()
      console.log(list)
      setList(list.data.channels)
    })()
  },[])

  return (
    <div>
      <h1>React App</h1>
      <ul>
        {
          List.map((item:any) => (
            <li key={item.id}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App;