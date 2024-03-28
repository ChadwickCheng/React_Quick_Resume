import './App.scss'
import avatar from './images/bozai.png'
import { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

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
*/

const App = () => {
  // 初始按最热排
  const [commentList, setCommentList] = useState(
    _.orderBy(defaultList, 'like', 'desc')
  )
  const handleDel = (id: any) => {
    const newList = commentList.filter((item: any) => item.user.uid !== id)
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
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map((item: any)=>(
            <div className="reply-item" key={item.rpid}>
            {/* 头像 */}
            <div className="root-reply-avatar">
              <div className="bili-avatar">
                <img
                  className="bili-avatar-img"
                  alt=""
                  src={item.user.avatar}
                />
              </div>
            </div>

            <div className="content-wrap">
              {/* 用户名 */}
              <div className="user-info">
                <div className="user-name">{item.user.uname}</div>
              </div>
              {/* 评论内容 */}
              <div className="root-reply">
                <span className="reply-content">{item.content}</span>
                <div className="reply-info">
                  {/* 评论时间 */}
                  <span className="reply-time">{item.ctime}</span>
                  {/* 评论数量 */}
                  <span className="reply-time">点赞数:{item.like}</span>
                  {user.uid === item.user.uid && 
                  <span className="delete-btn" onClick={()=>handleDel(item.user.uid)}>
                    删除
                  </span>}
                </div>
              </div>
            </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default App