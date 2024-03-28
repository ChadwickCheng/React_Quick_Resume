// 整个项目入口
// react两个核心包
import React from 'react'
import ReactDOM from 'react-dom/client'
// 项目根组件
import App from './App.tsx'

// 将根组件渲染到id为root的dom节点
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)