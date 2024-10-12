import "./TabBar.css"
import HdrStrongIcon from '@mui/icons-material/HdrStrong';
import { useNavigate } from 'react-router-dom'
import Logo from "../components/Logo";
import BackgroundAIImg from "../../static/AICreate/3.png"
import { Link } from "react-router-dom";

function TabBar() {
    const navigate = useNavigate()
    const linkBackHome = () => {
        navigate('/')
    }
    return (
        <div className="tab-bar-box">
            <div className="logoSize">
                <Logo/>
            </div>
            <div className="tab-bar-backIcon">
                <HdrStrongIcon style={{ fontSize: '50px', color: '#fcadc7' }} onClick={() => linkBackHome()} />
            </div>
            <div className="tab-bar-main">
                <img src={BackgroundAIImg} className="tab-bar-backImg"/>
                <Link className="tab-bar-text-1" to='/login'>LOGIN</Link>
            </div>
        </div>
    )
}

export default TabBar