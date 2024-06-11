import "./HomeMainContent.css"
import SwiperCom from "../components/SwiperCom"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from "react"
// icon 图标
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import WebhookIcon from '@mui/icons-material/Webhook';
import WeatherCom from "../components/WeatherCom";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import bcImage from '../../static/AICreate/1.png'
import zIndex from "@mui/material/styles/zIndex";

function HomeMainContent() {
    const [box6Content, setBox6Content] = useState("")
    const [box6Switch, setBox6Switch] = useState(1)
    const [openDialog, setOpenDialog] = useState(false) // 打开dialog窗口
    const [city, setCity] = useState("")
    // const navigate = useNavigate()
    let childRef = useRef(null)

    const cityList = [
        { label: '深圳' },
        { label: '香港' },
        { label: '珠海' },
        { label: '惠州' },
        { label: '汕头' },
        { label: '潮汕' },
        { label: '东莞' },
        { label: '清远' },
        { label: '海口' },
        { label: '吉安' },
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

    const goInstrument = () => {
        // navigate('/instrument')
        window.open('/instrument', '_blank')
    }
    const goAiTalk = () => {
        // navigate('/aitalk')
        window.open('/aitalk', '_blank')
    }
    const checkBox6 = () => {
        let randomDemo = Math.random() * 5
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
    useEffect(() => {
        switch (box6Switch) {
            case 1:
            case 2:
                setBox6Content("Tips：按住Shift+滚轮可以左右滑动噢~")
                break;
            case 3:
                setBox6Content("Tips：下班不积极，脑袋有问题~")
                break;
            case 4:
                setBox6Content("Tips：让我看看是哪个小煞笔在疯狂点击呢？")
                break;
            case 5:
                setBox6Content("Tips：吗楼的命也是命!!!")
                break;
            default:
                setBox6Content("Tips：按住Shift+滚轮可以左右滑动噢~")
                break;
        }
    }, [box6Switch])
    return (
        <div className="parent-box">
            <div className="top-swallow"></div>
            <div className="bottom-swallow"></div>
            <div className="left-swallow"></div>
            <div className="right-swallow"></div>
            <div className="main-box">
                <div className="main-box-1 borderRadius" style={{ color: '#fff' }}>BOX1</div>
                <div className="main-box-2 borderRadius" style={{ color: '#fff' }}>
                    <img src={bcImage} className="weatherBackgroundImage"/>
                    <WeatherCom ref={childRef} clickFun={openWeatherChose}/>
                </div>
                <div className="main-box-3 borderRadius" style={{ color: '#fff' }}>BOX3</div>
                <div className="main-box-4 borderRadius" style={{ color: '#fff' }}>
                    <SwiperCom />
                </div>
                <div className="main-box-5 borderRadius" style={{ color: '#fff' }} onClick={() => goInstrument()}>
                    <CatchingPokemonIcon style={{ fontSize: '100px', color: '#fff' }} />
                </div>
                <div className="main-box-6 borderRadius" style={{ color: '#fff' }} onClick={() => checkBox6()}>{box6Content}</div>
                <div className="main-box-7 borderRadius" style={{ color: '#fff' }} onClick={() => goAiTalk()}>
                    <WebhookIcon style={{ fontSize: '100px', color: '#fff' }} />
                </div>
                <div className="main-box-8 borderRadius" style={{ color: '#fff' }}>BOX8</div>
                <div className="main-box-9 borderRadius" style={{ color: '#fff' }}>BOX9</div>
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
        </div>
    )
}

export default HomeMainContent