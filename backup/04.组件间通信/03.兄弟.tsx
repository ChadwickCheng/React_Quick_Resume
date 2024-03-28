/*
兄弟组件
*/

import { useState } from "react"


const A = (props: any) => {
  const name = '有珠落入静希怀'
  return (
    <div>
      <h1>组件A</h1>
      <button onClick={()=>props.onGetAName(name)}>A send</button>
    </div>
  )
}

const B = (props: any) => {
  return (
    <div>
      <h1>组件B</h1>
      <h2>B收到A的数据：{props.name}</h2>
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const getAName = (name: any)=>{
    console.log(name)
    setName(name)
  }
  return (
    <div>
      <A onGetAName={getAName}/>
      <hr />
      <B name={name}/>
    </div>
  )
}

export default App;