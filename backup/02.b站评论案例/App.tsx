import './App.scss'
import avatar from './images/bozai.png'
import { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import {v4 as uuidV4} from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

/*
渲染评论列表
  1. useState维护list
  2. map
删除评论
  1. 条件渲染删除按钮,只有自己的评论才有删除按钮
  2. 当前项id作filter实现删除
渲染tab+点击高亮
  1. map渲染
  2. 点击谁记录谁的type，遍历时每一项type匹配，匹配上就设置高亮类名
时间排序新的在前，点赞排序多的在前
  1. 按照不同的排序处理状态并新值替换旧值
使用classnames优化类名控制
  1. npm i classnames
发表评论
  1. 获取评论内容
  2. 点击按钮发布
  3. rpid uuid ctime使用dayjs
清空内容与重新聚焦
  1. 发表后清空内容 value设置为空
  2. 重新聚焦 获取dom focus
*/

/*
1. 请求接口获取评论列表并渲染
  1. json-server + axios
    1. npm i json-server axios
    2. db.json
    3. json-server --watch db.json
  2. useEffect
2. 自定义hook封装数据请求
3. 评论抽离为item
*/

// 请求的hook
function useGetList(){
  // 获取接口数据
  const [commentList, setCommentList] = useState([])
  useEffect(()=>{
    // 请求数据
    async function getList(){
      const res = await axios.get('http://localhost:3001/list')
      setCommentList(res.data)
    }
    getList()
  },[])
  return {
    commentList, setCommentList
  }
}

// 评论item组件
function Item(props: any): JSX.Element{
  return (<div className="reply-item">
    {/* 头像 */}
    <div className="root-reply-avatar">
      <div className="bili-avatar">
        <img
          className="bili-avatar-img"
          alt=""
          src={props.item.user.avatar}
        />
      </div>
    </div>

    <div className="content-wrap">
      {/* 用户名 */}
      <div className="user-info">
        <div className="user-name">{props.item.user.uname}</div>
      </div>
      {/* 评论内容 */}
      <div className="root-reply">
        <span className="reply-content">{props.item.content}</span>
        <div className="reply-info">
          {/* 评论时间 */}
          <span className="reply-time">{props.item.ctime}</span>
          {/* 评论数量 */}
          <span className="reply-time">点赞数:{props.item.like}</span>
          {user.uid === props.item.user.uid && 
          <span className="delete-btn" onClick={()=>props.onDel(props.item.rpid)}>
            删除
          </span>}
        </div>
      </div>
    </div>
  </div>)
}

const App = () => {
  // 初始按最热排
  // const [commentList, setCommentList] = useState(
  //   _.orderBy(defaultList, 'like', 'desc')
  // )
  // 自定义hook使用
  const {commentList, setCommentList} = useGetList()
  

  // 删除评论
  const handleDel = (id: any) => {
    const newList = commentList.filter((item: any) => item.rpid !== id)
    setCommentList(newList)
  }
  // tab切换
  const [type, setType] = useState('hot')
  const handleTabChange = (type: string) => {
    setType(type)
    // 基于列表排序 lodash现成工具
    if(type==='hot'){
      setCommentList(
        _.orderBy(commentList,'like','desc')
      )
    }else{
      setCommentList(
        _.orderBy(commentList,'ctime','desc')
      )
    }
  }
  // 发表评论
  const [content,setContent] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const handlePublish = () => {
    if(content.trim()===''){
      alert('请输入评论内容')
      return
    }
    const newComment = {
      rpid: Number(uuidV4()),
      user:{
        uid:'1834315',
        avatar,
        uname: 'kuonji'
      },
      content,
      ctime: dayjs(new Date()).format('MM-DD hh:mm'),// m-d h:m
      like: 66
    }
    setCommentList([newComment,...commentList])
    // 清空内容
    setContent('')
    // 重新聚焦
    inputRef.current?.focus()
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((item: any) => {
              return (
                <span 
                key={item.type}
                onClick={()=>handleTabChange(item.type)}
                className={classNames('nav-item',{active: type===item.type})}>
                  {/* className={`nav-item ${type===item.type && 'active'}`} */}
                  {item.text} 
                </span>
              )
            })}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              ref={inputRef}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map((item: any)=>(
            <Item key={item.id} item={item} onDel={handleDel}/>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default App