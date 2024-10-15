import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import './login.css'
import { get } from "../../utils/request"
import Logo from "../components/Logo"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import backMusic from "../../static/Music/Coffee Date,GameChops - Great Fairy Fountain.mp3"

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
    const [systemWidth, setSystemWidth] = useState("") // 响应式处理
    const resizeUpdate = (e) => {
        setSystemWidth(e.target.innerWidth)
    }
    useEffect(() => {
        setSystemWidth(window.innerWidth)
        window.addEventListener('resize', resizeUpdate)
        return () => {
            window.removeEventListener('resize', resizeUpdate)
        }
    }, [])
    useEffect(() => {
        console.log('我是系统宽度：', systemWidth)
    }, [systemWidth])
    // 关闭错误弹窗的函数
    const closeErrorAlert = () => {
        setOpenErrorAlert(false)
    }
    const register = () => {
        navigate('/login/register')
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
            id: value,
            password: keywords
        }
        navigate('/home')
        // let res = get('/', form)
        // dispatch(fetchLogin(form))
    }
    return (
        systemWidth >= 750 ? (
            <div className="inputbBox">
                <ErrorAlert alertOpen={openErrorAlert} alertText={alertText} handleClose={closeErrorAlert} />
                <div className="contentLogoBox">
                    <Logo />
                </div>
                {/* 音频 */}
                <audio className="loginAudio" src={backMusic} controls preload="auto" loop>
                </audio>
                {/* 相机线 */}
                <div className="line" style={{ top: '10px', left: '10px' }} />
                <div className="line" style={{ top: '2px', left: '18px', transform: 'rotate(90deg)' }} />
                <div className="line" style={{ top: '2px', right: '18px', transform: 'rotate(90deg)' }} />
                <div className="line" style={{ top: '10px', right: '10px' }} />
                <div className="line" style={{ bottom: '10px', left: '10px' }} />
                <div className="line" style={{ bottom: '2px', left: '18px', transform: 'rotate(90deg)' }} />
                <div className="line" style={{ bottom: '2px', right: '18px', transform: 'rotate(90deg)' }} />
                <div className="line" style={{ bottom: '10px', right: '10px' }} />
                {/* 变化线 左侧*/}
                <div className="longLine-left" style={{ left: '-100px', top: '10px' }}>
                    <div />
                </div>
                <div className="longLine-left-2" style={{ left: '-120px', top: '30px' }}>
                    <div />
                </div>
                <div className="longLine-left-3" style={{ left: '-140px', top: '50px' }}>
                    <div />
                </div>
                <div className="longLine-left-4" style={{ left: '-160px', top: '70px' }}>
                    <div />
                </div>
                <div className="longLine-left-5" style={{ left: '-180px', top: '90px' }}>
                    <div />
                </div>
                <div className="longLine-left-6" style={{ left: '-160px', top: '110px' }}>
                    <div />
                </div>
                <div className="longLine-left-7" style={{ left: '-140px', top: '130px' }}>
                    <div />
                </div>
                <div className="longLine-left-8" style={{ left: '-120px', top: '150px' }}>
                    <div />
                </div>
                <div className="longLine-left-9" style={{ left: '-100px', top: '170px' }}>
                    <div />
                </div>
                <div className="longLine-left-10" style={{ left: '-80px', top: '190px' }}>
                    <div />
                </div>
                {/* 变化线 右侧 */}
                <div className="longLing-right">
                    {/* <div/> */}
                    <div className="confirmBtn" onClick={() => confirm()}>Sign In</div>
                    <SettingsOutlinedIcon className="settingIcon" />
                </div>
                <div className="inputItem">
                    <span>賬號：</span>
                    <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
                </div>
                <div className="inputItem">
                    <span>密碼：</span>
                    <input type="password" value={keywords} onChange={(e) => { setKewords(e.target.value) }} />
                </div>
                <div className="buttonGroup">
                    <button>Forget</button>
                    <button onClick={() => register()}>Sign Up</button>
                </div>
            </div>
        ) : (
            <div className="phoneBox">
                <ErrorAlert alertOpen={openErrorAlert} alertText={alertText} handleClose={closeErrorAlert} />
                <div className="phoneLogoBox">
                    <Logo />
                </div>
                <div className="inputItem">
                    <span>賬號：</span>
                    <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
                </div>
                <div className="inputItem">
                    <span>密碼：</span>
                    <input type="password" value={keywords} onChange={(e) => { setKewords(e.target.value) }} />
                </div>
                <div className="buttonGroup">
                    <button>Forget</button>
                    <button onClick={() => register()}>Sign In</button>
                </div>
                <div className="phoneSingnUp" onClick={() => confirm()}>Sign Up</div>
            </div>
        )
    )
}
export default Form