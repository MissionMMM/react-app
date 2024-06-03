import "./HomeMainContent.css"
import SwiperCom from "../components/SwiperCom"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
// icon 图标
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import WebhookIcon from '@mui/icons-material/Webhook';

function HomeMainContent() {
    const [box6Content, setBox6Content] = useState("")
    const [box6Switch, setBox6Switch] = useState(1)
    const navigate = useNavigate()

    const goInstrument = () => {
        // navigate('/instrument')
        window.open('/instrument','_blank')
    }
    const goAiTalk = () => {
        // navigate('/aitalk')
        window.open('/aitalk','_blank')
    }
    const checkBox6 = () => {
        let randomDemo = Math.random() * 5
        let random = Math.ceil(randomDemo)
        setBox6Switch(random)
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
    })
    return (
        <div className="parent-box">
            <div className="top-swallow"></div>
            <div className="bottom-swallow"></div>
            <div className="left-swallow"></div>
            <div className="right-swallow"></div>
            <div className="main-box">
                <div className="main-box-1 borderRadius" style={{ color: '#fff' }}>BOX1</div>
                <div className="main-box-2 borderRadius" style={{ color: '#fff' }}>BOX2</div>
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
        </div>
    )
}

export default HomeMainContent