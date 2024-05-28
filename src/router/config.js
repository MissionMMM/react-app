// 引入路由
import { createBrowserRouter } from "react-router-dom";
// 导入项目的根组件
import App from "../pages/home/App"
import Home from "../pages/home/Home"
import Login from "../pages/login/login"
import Register from "../pages/login/register"
import Instrument from "../pages/instrument/instrument";
import AiTalk from "../pages/AI/AiTalk";

// 创建router实例对象
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/login/register',
        element: <Register />
    },
    {
        path: '/instrument',
        element: <Instrument />
    },
    {
        path: '/aitalk',
        element: <AiTalk />
    },
])

export default router