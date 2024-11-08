import "./TabBar.css"
import HdrStrongIcon from '@mui/icons-material/HdrStrong';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'
import Logo from "../components/Logo";
import BackgroundAIImg from "../../static/AICreate/3.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function TabBar({ userInfo = {} }) {
    const [tabBarUserInfo, setTabBarUserInfo] = useState({})
    const navigate = useNavigate()
    const linkBackHome = () => {
        navigate('/')
    }
    const quitLogin = () => {
        localStorage.clear()
        navigate('/')
    }
    useEffect(() => {
        setTabBarUserInfo(userInfo)
    }, [userInfo])
    return (
        <div className="tab-bar-box">
            <div className="logoSize">
                <Logo />
            </div>
            <div className="tab-bar-backIcon">
                <HdrStrongIcon style={{ fontSize: '50px', color: '#fcadc7' }} onClick={() => linkBackHome()} />
            </div>
            <div className="tab-bar-main">
                <img src={BackgroundAIImg} className="tab-bar-backImg" />
                {
                    Object.keys(tabBarUserInfo).length === 0 ?
                        <Link className="tab-bar-text-1" to='/login'>LOGIN</Link> :
                        <div className="tab-bar-user-info">
                            <div className="tab-bar-user-text">Welcome~</div>
                            <div className="tab-bar-user-text" style={{ margin: '0 6px' }}>{tabBarUserInfo.gender === "男" ? "Mr." : "Miss."}</div>
                            <div className="tab-bar-user-text">{tabBarUserInfo.nick_name}</div>
                            <div className="tab-bar-user-quit" onClick={() => { quitLogin() }}>
                                QUIT
                                <ExitToAppIcon />
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default TabBar