/*
f2s
1. 父组件传数据 子组件标签绑定属性
2. 子组件接收数据 props
*/

const Son = (props: any)=>{
  // console.log(props)// {name: "我是你爸爸"}
  console.log(props)
  const {name} = props
  return (
    <div>
      <h1>this is son</h1>
      <h2>我获取了爸爸的数据 {name}, jsx: {props.child}</h2>
      <h2>特殊的props children: {props.children}</h2>
    </div>
  )
}

const App = () => {
  const name = '我是你爸爸'
  return (
    <div>
      <Son 
      name={name}
      age={18}
      isTrue={false}
      list={[1,2,3]}
      obj={{name:'zhangsan'}}
      cb={()=>{console.log('hello')}}
      child={<h1>我是fufufu元素</h1>}
      >
        <span>特殊的prop children</span>
      </Son>
    </div>
  );
}

export default App;