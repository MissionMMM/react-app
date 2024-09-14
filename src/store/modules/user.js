import { createSlice } from "@reduxjs/toolkit";
// import { request } from "../../utils";

const userStore = createSlice({
    name: "user",
    initialState: {
        token: '',
        isMobile: false,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        watchSystem(state, action) {
            state.isMobile = action.payload
        }
    }
})

// 解构出actionCreater
const { setToken, watchSystem } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法 完成登录获取token
/* const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1、发送异步请求
        const res = await request.post('/authorizations', loginForm)
        // 2、提交同步action进行token存入
        dispatch(setToken(res.data.token))
    }
} */

// export { setToken, fetchLogin }
export { setToken, watchSystem }

export default userReducer