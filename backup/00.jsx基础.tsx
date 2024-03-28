// 根组件

// JSX是js扩展，需要babel转义

/*
JSX写JS表达式使用{}
  1. 引号传递字符串
  2. js变量
  3. 方法调用
  4. 对象

列表渲染
  需要原生map

条件渲染
  1. 逻辑与运算符 && 前面为true，返回后面的值 控制一个元素的显示和隐藏
  2. 三元运算符 控制两个元素的显示和隐藏
  3. 自定义函数加if判断

事件绑定
  1. on+事件名称={事件处理函数} 小驼峰命名
  2. 获取事件对象e
  3. 需要传递参数，则调用时传递箭头函数
  4. 又要参数又要e，声明时要在最后声明e，调用时传入e
*/
const count = 100;
function getName(){
  return 'kuonji';
}
const list = [
  {id:1, name:'vue'},
  {id:2, name:'react'},
  {id:3, name:'angular'},
]

const articleType: number = 1; // 0 1 3
function getArticleItem(){
  if(articleType===0){
    return <div>文章类型0</div>
  }else if(articleType===1){
    return <div>文章类型1</div>
  }else{
    return <div>文章类型3</div>
  }
}

const handleClick = (e: React.MouseEvent)=>{
  console.log('点击事件', e)
}

const handleClick1 = (name: string)=>{
  console.log('点击事件', name)
}

const handleClick2 = (name: string, e: React.MouseEvent)=>{
  console.log('点击事件', name, e)
}

function App() {
  return (
    <div>
      <h1>App</h1>
      {'引号传递字符串'}
      <br />
      {count}
      <br />
      {getName()}
      <br />
      {count > 100 ? '大于100' : '小于100'}
      <br />
      <div style={ {color:'red'} }>this is div</div>
      {/* 渲染列表 */}
      <ul>
        {list.map(
          item=>
            <li key={item.id}>
              {item.name}
            </li>
        )}
      </ul>
      {/* 条件渲染 */}
      {/* 逻辑与 */}
      {count > 100 && <div>count大于100</div>}
      {/* 三元 */}
      {count > 100 ? <div>count大于100</div> : <div>count小于100</div>}
      {/* 自定义函数 */}
      {getArticleItem()}
      <br />
      <button onClick={handleClick}>click me</button>
      <br />
      {/* 传递参数 */}
      <button onClick={()=>handleClick1('kuonji')}>click me</button>
      <br />
      {/* 又要参数又要e */}
      <button onClick={(e)=>handleClick2('kuonji', e)}>click me</button>
    </div>
  )
}

export default App