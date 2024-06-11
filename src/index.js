// 项目的入口 从这里开始运行

// React 必要的两个核心包
import React from "react";
import ReactDOM from "react-dom/client";
import store from './store'
import { Provider } from 'react-redux'
// 引入路由
import router from './router/config'
import { RouterProvider } from "react-router-dom";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    // </React.StrictMode>
)