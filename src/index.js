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
import VConsole from "vconsole";

// 移动端监听console
new VConsole()

document.oncontextmenu = function () {
    // alert("右键被禁用");
    return false;
};
// 禁止F12打开调试控制台
// document.onkeydown =
//     document.onkeyup =
//     document.onkeypress =
//     function (event) {
//         let e =
//             event || window.event || arguments.callee.caller.arguments[0];
//         if (e && e.keyCode == 123 || e.key == "Shift" || e.key == "I") {
//             e.returnValue = false;
//             return false;
//         }
//     };

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
    // </React.StrictMode>
)