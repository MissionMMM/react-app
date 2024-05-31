import './backgroundImage.css'
// 背景图
import image from '../../static/myPhone/22.jpg'
// import image from '../../static/LoadingImage/bg1.png'
// import image from '../../static/LoadingImage/finalBg.jpg'
// import image from '../../static/LoadingImage/magic.jpg'
// loading状态图
// import loadingIcon from '../../static/LoadingImage/icon.png'
// import loadingFirst from '../../static/LoadingImage/loading.png'
// import loadingLast from '../../static/LoadingImage/please_waitng.png'

import { useEffect, useState } from 'react'
// icon 图标
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useNavigate } from 'react-router-dom'

function BackgroundImage() {
    // 将跳转方法放入变量
    const navigate = useNavigate()
    // 百叶窗动画参数
    const [moveStatus1, setMoveStatus1] = useState(false)
    const [moveStatus1_on, setMoveStatus1_on] = useState(true)
    const [moveStatus2, setMoveStatus2] = useState(false)
    const [moveStatus2_on, setMoveStatus2_on] = useState(true)
    const [moveStatus3, setMoveStatus3] = useState(false)
    const [moveStatus3_on, setMoveStatus3_on] = useState(true)
    const [moveStatus4, setMoveStatus4] = useState(false)
    const [moveStatus4_on, setMoveStatus4_on] = useState(true)
    const [moveStatus5, setMoveStatus5] = useState(false)
    const [moveStatus5_on, setMoveStatus5_on] = useState(true)
    const [moveStatus6, setMoveStatus6] = useState(false)
    const [moveStatus6_on, setMoveStatus6_on] = useState(true)
    const [moveStatus7, setMoveStatus7] = useState(false)
    const [moveStatus7_on, setMoveStatus7_on] = useState(true)
    const [moveStatus8, setMoveStatus8] = useState(false)
    const [moveStatus8_on, setMoveStatus8_on] = useState(true)
    const [moveStatus9, setMoveStatus9] = useState(false)
    const [moveStatus9_on, setMoveStatus9_on] = useState(true)
    const [moveStatus10, setMoveStatus10] = useState(false)
    const [moveStatus10_on, setMoveStatus10_on] = useState(true)
    const onMouse = (e) => {
        // console.log('我是鼠标移动：', e.target.innerHTML)
        console.log('我是鼠标移动：', e.target.id)
        if (e.target.id === 'page1' && moveStatus1_on) {
            setMoveStatus1_on(false)
            setMoveStatus1(true)
            setTimeout(() => {
                setMoveStatus1(false)
                setMoveStatus1_on(true)
            }, 4000);
        }
        if (e.target.id === 'page2' && moveStatus2_on) {
            setMoveStatus2_on(false)
            setMoveStatus2(true)
            setTimeout(() => {
                setMoveStatus2_on(true)
                setMoveStatus2(false)
            }, 4000);
        }
        if (e.target.id === 'page3' && moveStatus3_on) {
            setMoveStatus3_on(false)
            setMoveStatus3(true)
            setTimeout(() => {
                setMoveStatus3_on(true)
                setMoveStatus3(false)
            }, 4000);
        }
        if (e.target.id === 'page4' && moveStatus4_on) {
            setMoveStatus4_on(false)
            setMoveStatus4(true)
            setTimeout(() => {
                setMoveStatus4_on(true)
                setMoveStatus4(false)
            }, 4000);
        }
        if (e.target.id === 'page5' && moveStatus5_on) {
            setMoveStatus5_on(false)
            setMoveStatus5(true)
            setTimeout(() => {
                setMoveStatus5_on(true)
                setMoveStatus5(false)
            }, 4000);
        }
        if (e.target.id === 'page6' && moveStatus6_on) {
            setMoveStatus6_on(false)
            setMoveStatus6(true)
            setTimeout(() => {
                setMoveStatus6_on(true)
                setMoveStatus6(false)
            }, 4000);
        }
        if (e.target.id === 'page7' && moveStatus7_on) {
            setMoveStatus7_on(false)
            setMoveStatus7(true)
            setTimeout(() => {
                setMoveStatus7_on(true)
                setMoveStatus7(false)
            }, 4000);
        }
        if (e.target.id === 'page8' && moveStatus8_on) {
            setMoveStatus8_on(false)
            setMoveStatus8(true)
            setTimeout(() => {
                setMoveStatus8_on(true)
                setMoveStatus8(false)
            }, 4000);
        }
        if (e.target.id === 'page9' && moveStatus9_on) {
            setMoveStatus9_on(false)
            setMoveStatus9(true)
            setTimeout(() => {
                setMoveStatus9_on(true)
                setMoveStatus9(false)
            }, 4000);
        }
        if (e.target.id === 'page10' && moveStatus10_on) {
            setMoveStatus10_on(false)
            setMoveStatus10(true)
            setTimeout(() => {
                setMoveStatus10_on(true)
                setMoveStatus10(false)
            }, 4000);
        }
    }
    // 星星点击动画
    const [startStatus, setStartStatus] = useState(0)
    const [startShow, setStartShow] = useState(1)
    const [startLoading, setStartLoading] = useState(0)
    const startHandle = () => {
        // 点击星星后切换隐藏样式
        setStartStatus(1)
        // 动画结束后让该模块消失 loading图案出现
        setTimeout(() => {
            setStartLoading(1)
        }, 1000);
        setTimeout(() => {
            setStartShow(0)
        }, 2000);
        setTimeout(() => {
            navigate('/login')
        }, 3500);
    }
    useEffect(() => {
        // console.log('我是状态1：', moveStatus1)
        console.log('点击啦：', startStatus)
    })
    return (
        <div className="backgroundImage">
            {
                startLoading == 1 && (
                    <div className='loading-box'>
                        PLEASE WAITING~
                    </div>
                )
            }
            {
                startShow == 1 && (
                    <div className={startStatus == 0 ? 'iconStyle' : 'iconStyle-hide'}>
                        <div className='icon' onClick={() => { startHandle() }}>
                            <StarBorderIcon style={{ fontSize: '200px', color: '#ffc0cb' }} />
                        </div>
                    </div>
                )
            }
            {/* D:\React\my-app\src\static\Bueatyfull-Girl\rectangle-x\9.jpg */}
            <div className={[startStatus == 1 ? "backgroundImage-hide" : ""]} style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', display: 'flex' }}>
                <div className={moveStatus1 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id='page1' src={image} />
                </div>
                <div className={moveStatus2 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page2" style={{ left: '-100%' }} src={image} />
                </div>
                <div className={moveStatus3 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page3" style={{ left: '-200%' }} src={image} />
                </div>
                <div className={moveStatus4 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page4" style={{ left: '-300%' }} src={image} />
                </div>
                <div className={moveStatus5 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page5" style={{ left: '-400%' }} src={image} />
                </div>
                <div className={moveStatus6 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page6" style={{ left: '-500%' }} src={image} />
                </div>
                <div className={moveStatus7 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page7" style={{ left: '-600%' }} src={image} />
                </div>
                <div className={moveStatus8 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page8" style={{ left: '-700%' }} src={image} />
                </div>
                <div className={moveStatus9 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page9" style={{ left: '-800%' }} src={image} />
                </div>
                <div className={moveStatus10 ? 'pageItem pageItem-hover' : 'pageItem'} onMouseMove={(e) => onMouse(e)}>
                    <img id="page10" style={{ left: '-900%' }} src={image} />
                </div>
            </div>
        </div>
    )
}

export default BackgroundImage