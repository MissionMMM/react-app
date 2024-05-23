import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './login.css'
import { get } from "../../utils/request"

// import { useDispatch } from "react-redux"
// import { fetchLogin } from "../../store/modules/user"
import ErrorAlert from '../alert/errorAlert'

function Form() {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [keywords, setKewords] = useState('')
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    // 关闭错误弹窗的函数
    const closeErrorAlert = () => {
        setOpenErrorAlert(false)
    }
    const register = () => {
        navigate('/Register')
    }
    const confirm = () => {
        // 测试账号 13888888888
        // 测试密码 246810
        console.log('我是账号：', value)
        console.log('我是密码：', keywords)
        if (!value) {
            setAlertText("请输入账号")
            setOpenErrorAlert(true)
            return
        }
        if (!keywords) {
            setAlertText("请输入密码")
            setOpenErrorAlert(true)
            return
        }
        let form = {
            mobile: value,
            code: keywords
        }
        let res = get('/', form)
        console.log(res)
        // dispatch(fetchLogin(form))
    }
    const back = () => {
        navigate('/home')
    }
    return (
        <div className="inputbBox">
            <ErrorAlert alertOpen={openErrorAlert} alertText={alertText} handleClose={closeErrorAlert} />
            <div className="backIcon" onClick={() => back()}>Back</div>
            <div className="inputItem">
                <span>账号：</span>
                <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
            </div>
            <div className="inputItem">
                <span>密码：</span>
                <input type="password" value={keywords} onChange={(e) => { setKewords(e.target.value) }} />
            </div>
            <div className="buttonGroup">
                <button onClick={() => confirm()}>提 交</button>
                <button onClick={() => register()}>注 册</button>
            </div>
        </div>
    )
}
export default Form