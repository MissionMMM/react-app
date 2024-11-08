import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: 'counter',
    // 初始化state
    initialState: {
        userInfo: {}
    },
    // 修改数据的方法 同步方法 支持直接修改
    reducers: {
        editUserInfo(state, action) {
            state.userInfo = action.payload
        }
    }
})
// 解构出来actionCreater函数
const { editUserInfo } = counterStore.actions
// 获取reducer
const userReducer = counterStore.reducer

// 以按需导出的方式到处actionCreater
export { editUserInfo }
// 以默认导出的方式导出reducer
export default userReducer;