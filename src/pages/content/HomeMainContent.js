import "./HomeMainContent.css"
import SwiperCom from "../components/SwiperCom"
// import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from "react"
// icon 图标
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import WebhookIcon from '@mui/icons-material/Webhook';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import LensBlurIcon from '@mui/icons-material/LensBlur';

import WeatherCom from "../components/WeatherCom";
import NewCom from "../components/NewCom"
import MessageBorad from "../components/MessageBorad";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import bcImage from '../../static/AICreate/2.png'

// 引入提示框
import ErrorAlert from "../alert/errorAlert";
import InfoAlert from "../alert/infoAlert";

import { traditionalized } from "../../utils/simpleTraditionalizedExchange";

function HomeMainContent() {
    const [box6Content, setBox6Content] = useState("")
    const [box6Switch, setBox6Switch] = useState(1)
    const [openDialog, setOpenDialog] = useState(false) // 打开dialog窗口
    const [openDialog2, setOpenDialog2] = useState(false) // 打开dialog窗口
    const [openErrorAlert, setOpenErrorAlert] = useState(false) // 打开报错弹窗
    const [openInfoAlert, setOpenInfoAlert] = useState(false) // 打开提示弹窗
    const [errorAlertText, setErrorAlertText] = useState("") // 报错弹窗提示文字
    const [infoAlertText, setInfoAlertText] = useState("") // 提示弹窗提示文字
    const [threeDJumpList, setThreeDJumpList] = useState(false)
    const [city, setCity] = useState("")
    // const navigate = useNavigate()
    let childRef = useRef(null)

    const cityList = [
        { label: '深圳' },
        { label: '吉安' },
        { label: '香港' },
        { label: '珠海' },
        { label: '惠州' },
        { label: '汕头' },
        { label: '东莞' },
        { label: '清远' },
        { label: '海口' },
        { label: '岳阳' },
        { label: '长沙' },
        { label: '株洲' },
        { label: '衡阳' },
        { label: '怀化' },
        { label: '武汉' },
        { label: '赤壁' },
        { label: '重庆' },
        { label: '成都' },
        { label: '兰州' },
        { label: '北京' },
        { label: '上海' },
        { label: '大理' },
        { label: '大连' },
        { label: '哈尔滨' },
        { label: '吉林' },
        { label: '青岛' },
        { label: '甘肃' },
        { label: '内蒙古' },
        { label: '新疆' },
        { label: '西藏' },
    ]
    const handleOpenDialog2 = (e = "") => {
        if (e == "threeDJump") {
            setThreeDJumpList(true)
        } else {
            setThreeDJumpList(false)
        }
        setOpenDialog2(true)
    }
    const jumpHistoryPage = (e) => {
        switch (e) {
            case 0:
                window.open('/instrument', '_blank')
                break;
            case 1:
                window.open('/aitalk', '_blank')
                break;
            case 2:
                window.open('/threeDContent/test', '_blank')
                break;
            case 3:
                window.open('/mineSweeper', '_blank')
                break;
            case 4:
                window.open('/threeDContent/demo', '_blank')
                break;
            default:
                setInfoAlertText('该模块正在构建中...')
                setOpenInfoAlert(true)
                break;
        }
    }
    const checkBox6 = () => {
        let randomDemo = Math.random() * 10
        let random = Math.ceil(randomDemo)
        setBox6Switch(random)
    }
    const dialogHandleClose = () => {
        setOpenDialog(false)
    }
    const openWeatherChose = () => {
        setOpenDialog(true)
    }
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }
    const confirmCityWeather = () => {
        childRef.current.getWeather(city)
        dialogHandleClose()
    }
    const dialogHandleClose2 = () => {
        setOpenDialog2(false)
    }
    useEffect(() => {
        switch (box6Switch) {
            case 1:
                setBox6Content(traditionalized("Tips：结果不如意不如换方法而不是改变结果降低标准"))
                break;
            case 2:
                setBox6Content("Tips：按住Shift+滾輪可以左右滑動噢~")
                break;
            case 3:
                setBox6Content("Tips：人生只有一種英雄那就是知道了生活的真相卻依舊選擇熱愛生活的人~")
                break;
            case 4:
                setBox6Content("Tips：嗎嘍的命也是命!!!")
                break;
            case 5:
                setBox6Content(traditionalized("Tips：愿你的信仰经得起考验"))
                break;
            case 6:
                setBox6Content(traditionalized("Tips：除了死亡，一切的失败只存在于心理层面"))
                break;
            case 7:
                setBox6Content(traditionalized("Tips：自信不是自负，客观看待自己，保持自信，保持和谐，承认失败不代表质疑自己，勇敢面对一切吧~"))
                break;
            case 8:
                setBox6Content(traditionalized("Tips：迷茫的时候就去做梦吧，梦里有你想要的答案，答案只有一个，方向也只有一个(前进、后退)"))
                break;
            case 9:
                setBox6Content(traditionalized("Tips：能击败你的永远只有你自己"))
                break;
            case 10:
                setBox6Content(traditionalized("Tips：除了死亡，一切的失败只存在于心理层面"))
                break;
            default:
                setBox6Content("Tips：按住Shift+滚轮可以左右滑动噢~")
                break;
        }
    }, [box6Switch])

    const closeErrorAlert = () => {
        setOpenErrorAlert(false)
    }
    const closeInfoAlert = () => {
        setOpenInfoAlert(false)
    }
    const openMessageBorad = () => {
        if (!localStorage.getItem('token')) {
            setErrorAlertText("请先登陆")
            setOpenErrorAlert(true)
        }
    }
    return (
        <div className="parent-box">
            <ErrorAlert alertOpen={openErrorAlert} alertText={errorAlertText} handleClose={closeErrorAlert} />
            <InfoAlert alertOpen={openInfoAlert} alertText={infoAlertText} handleClose={closeInfoAlert} />
            <div className="top-swallow"></div>
            <div className="bottom-swallow"></div>
            <div className="left-swallow"></div>
            <div className="right-swallow"></div>
            <div className="main-box-srollBox">
                <div className="main-box">
                    <div className="main-box-1 borderRadius" style={{ color: '#fff' }} onClick={() => handleOpenDialog2("threeDJump")}>
                        <ThreeDRotationIcon style={{ fontSize: '130px', color: '#fff' }} />
                    </div>
                    <div className="main-box-2 borderRadius" style={{ color: '#fff' }}>
                        <img src={bcImage} className="weatherBackgroundImage" />
                        <WeatherCom ref={childRef} clickFun={openWeatherChose} />
                    </div>
                    <div className="main-box-3 borderRadius" style={{ color: '#fff' }}>{traditionalized("该模块构建中...")}</div>
                    <div className="main-box-4 borderRadius" style={{ color: '#fff' }}>
                        <SwiperCom />
                    </div>
                    <div className="main-box-5 borderRadius" style={{ color: '#fff' }} onClick={() => handleOpenDialog2()}>
                        <CatchingPokemonIcon style={{ fontSize: '100px', color: '#fff' }} />
                    </div>
                    <div className="main-box-6 borderRadius" style={{ color: '#fff' }} onClick={() => checkBox6()}>{box6Content}</div>
                    <div className="main-box-7 borderRadius" style={{ color: '#fff' }} onClick={() => jumpHistoryPage(1)}>
                        <WebhookIcon style={{ fontSize: '100px', color: '#fff' }} />
                    </div>
                    <div className="main-box-8 borderRadius" style={{ color: '#fff' }} onClick={() => jumpHistoryPage(3)}>
                        <LensBlurIcon style={{ fontSize: '100px', color: '#fff' }} />
                    </div>
                    <div className="main-box-9 borderRadius"><NewCom /></div>
                    <div className="main-box-10 borderRadius" onClick={() => openMessageBorad()}>
                        <MessageBorad />
                    </div>
                </div>
            </div>
            <Dialog onClose={() => dialogHandleClose()} open={openDialog}>
                <div className="weatherChoseWin">
                    <Box sx={{ minWidth: 300 }} style={{ position: 'relative', top: '50px' }}>
                        <FormControl fullWidth color='secondary'>
                            <InputLabel id="demo-simple-select-label" style={{ color: '#fff', borderColor: 'pink' }}>City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                label="Age"
                                onChange={handleChangeCity}
                                style={{ color: '#fff' }}
                            >
                                {cityList.map((item, index) => {
                                    return (
                                        <MenuItem value={item.label} key={index}>{item.label}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button variant="contained" color="secondary" style={{ position: 'absolute', bottom: '10px' }} onClick={() => confirmCityWeather()}>CONFIRM</Button>
                </div>
            </Dialog>
            <Dialog onClose={() => dialogHandleClose2()} open={openDialog2}>
                {
                    threeDJumpList ?
                        (
                            <div className="instrument-chose-box">
                                <div className="instrument-chose-box-title">Chose Your Aim</div>
                                <Button className="instrument-chose-box-button" style={{ margin: '10px 5%', marginBottom: '3px' }} variant="contained" color="secondary" onClick={() => jumpHistoryPage(2)}>Demo-AutoCube</Button>
                                <Button className="instrument-chose-box-button" style={{ margin: '10px 5%', marginBottom: '3px' }} variant="contained" color="secondary" onClick={() => jumpHistoryPage(4)}>Demo-Else</Button>
                            </div>
                        )
                        :
                        (
                            <div className="instrument-chose-box">
                                <div className="instrument-chose-box-title">Chose Your Aim</div>
                                <Button className="instrument-chose-box-button" style={{ margin: '10px 5%', marginBottom: '3px' }} variant="contained" color="secondary" onClick={() => jumpHistoryPage(0)}>Instrument-URL</Button>
                                <Button className="instrument-chose-box-button" style={{ margin: '10px 5%', marginBottom: '3px' }} variant="contained" color="secondary" onClick={() => jumpHistoryPage(99)}>Instrument-Module</Button>
                            </div>
                        )
                }
            </Dialog>
        </div>
    )
}

export default HomeMainContent