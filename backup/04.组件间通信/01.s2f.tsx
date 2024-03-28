/*
s2f
和vue一样，父亲props传递一个函数给儿子，儿子调用这个函数，父亲就会执行这个函数
*/

import { useState } from "react"

const Son = (props: any)=>{
  const sonMsg = '我是你可爱的儿子'
  return (
    <div>
      <h1>this is son</h1>
      <button onClick={()=>props.onGetSonMsg(sonMsg)}>senMsgToFather</button>
    </div>
  )
}

const App = () => {
  const [msg, setMsg] = useState('')
  const getSonMsg = (msg: any)=>{
    console.log(msg)
    setMsg(msg)
  }
  return (
    <div>
      <h1>this is parent</h1>
      <hr />
      <Son onGetSonMsg={getSonMsg}/>
      <hr />
      <h1>msg from son: {msg}</h1>
    </div>
  );
}

export default App;