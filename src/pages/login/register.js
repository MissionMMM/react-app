import './register.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import CakeIcon from '@mui/icons-material/Cake';
import PolylineIcon from '@mui/icons-material/Polyline';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Register() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [inviteNum, setInviteNum] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [city, setCity] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [inputActived1, setInputActived1] = useState(false)
    const [inputActived2, setInputActived2] = useState(false)
    const [inputActived3, setInputActived3] = useState(false)
    const [inputActived4, setInputActived4] = useState(false)
    const [inputActived5, setInputActived5] = useState(false)
    const [inputActived6, setInputActived6] = useState(false)
    const [inputActived7, setInputActived7] = useState(false)
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
    const back = () => {
        navigate('/login')
    }
    const showPw = () => {
        setShowPassword(true)
    }
    const hidePw = () => {
        setShowPassword(false)
    }

    const inputClick = (e) => {
        switch (e) {
            case 1:
                setInputActived1(true)
                break;
            case 2:
                setInputActived2(true)
                break;
            case 3:
                setInputActived3(true)
                break;
            case 4:
                setInputActived4(true)
                break;
            case 5:
                setInputActived5(true)
                break;
            case 6:
                setInputActived6(true)
                break;
            case 7:
                setInputActived7(true)
                break;
        }
    }
    const inputBlur = (e) => {
        switch (e) {
            case 1:
                setInputActived1(false)
                break;
            case 2:
                setInputActived2(false)
                break;
            case 3:
                setInputActived3(false)
                break;
            case 4:
                setInputActived4(false)
                break;
            case 5:
                setInputActived5(false)
                break;
            case 6:
                setInputActived6(false)
                break;
            case 7:
                setInputActived7(false)
                break;
        }
    }

    return (
        systemWidth >= 750 ? (
            <div className='register-box'>
                <Button color="secondary" className='register-siderbar left-animation' style={{ left: '10%', fontSize: '20px' }} onClick={() => { back() }}><ArrowBackIosNewIcon style={{ color: 'pink', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => back()} /><span className='register-text-1'>BACK</span></Button>
                <div className='register-content'>
                    <div className='register-item'>
                        <div className='register-avactor'>
                            <PersonIcon style={{ fontSize: '100px', color: 'gray' }} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AccountBoxIcon className='register-icon-1' style={{ color: inputActived1 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入注册用户名' value={userId} onChange={(e) => { setUserId(e.target.value) }} onClick={() => inputClick(1)} onBlur={() => inputBlur(1)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <KeyIcon className='register-icon-1' style={{ color: inputActived2 ? '#333' : 'gray' }} />
                            <input className='register-input' type={showPassword ? 'text' : 'password'} placeholder='请输入密码' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} onClick={() => inputClick(2)} onBlur={() => inputBlur(2)} />
                            {showPassword ?
                                <RemoveRedEyeIcon className='register-icon-2' onClick={() => hidePw()} /> : <VisibilityOffIcon className='register-icon-2' onClick={() => showPw()} />
                            }

                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PhoneIcon className='register-icon-1' style={{ color: inputActived3 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入11位手机号' maxLength={11} value={userPhone} onChange={(e) => { setUserPhone(e.target.value) }} onClick={() => inputClick(3)} onBlur={() => inputBlur(3)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <CakeIcon className='register-icon-1' style={{ color: inputActived6 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入生日日期用 - 号连接' value={birthDate} onChange={(e) => { setBirthDate(e.target.value) }} onClick={() => inputClick(6)} onBlur={() => inputBlur(6)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <LocationCityIcon className='register-icon-1' style={{ color: inputActived7 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入所在地区：省份城市区' value={city} onChange={(e) => { setCity(e.target.value) }} onClick={() => inputClick(7)} onBlur={() => inputBlur(7)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AlternateEmailIcon className='register-icon-1' style={{ color: inputActived4 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入邮箱' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} onClick={() => inputClick(4)} onBlur={() => inputBlur(4)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PolylineIcon className='register-icon-1' style={{ color: inputActived5 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入邀请码' value={inviteNum} onChange={(e) => { setInviteNum(e.target.value) }} onClick={() => inputClick(5)} onBlur={() => inputBlur(5)} />
                        </div>
                    </div>
                </div>
                <Button color="secondary" className='register-siderbar right-animation' style={{ right: '10%' }}><span className='register-text-1'>NEXT</span><ArrowForwardIosIcon style={{ color: 'pink', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }} /></Button>
            </div>
        ) : (
            <div className='phoneBox'>
                <div className='phoneBackIcon' onClick={() => { back() }}>
                    <ArrowBackIosNewIcon />
                </div>
                <div className='phoneContentBox'>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AccountBoxIcon className='register-icon-1' style={{ color: inputActived1 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入注册用户名' value={userId} onChange={(e) => { setUserId(e.target.value) }} onClick={() => inputClick(1)} onBlur={() => inputBlur(1)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <KeyIcon className='register-icon-1' style={{ color: inputActived2 ? '#333' : 'gray' }} />
                            <input className='register-input' type={showPassword ? 'text' : 'password'} placeholder='请输入密码' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} onClick={() => inputClick(2)} onBlur={() => inputBlur(2)} />
                            {showPassword ?
                                <RemoveRedEyeIcon className='register-icon-2' onClick={() => hidePw()} /> : <VisibilityOffIcon className='register-icon-2' onClick={() => showPw()} />
                            }

                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PhoneIcon className='register-icon-1' style={{ color: inputActived3 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入11位手机号' maxLength={11} value={userPhone} onChange={(e) => { setUserPhone(e.target.value) }} onClick={() => inputClick(3)} onBlur={() => inputBlur(3)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <CakeIcon className='register-icon-1' style={{ color: inputActived6 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入生日日期用 - 号连接' value={birthDate} onChange={(e) => { setBirthDate(e.target.value) }} onClick={() => inputClick(6)} onBlur={() => inputBlur(6)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <LocationCityIcon className='register-icon-1' style={{ color: inputActived7 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入所在地区：省份城市区' value={city} onChange={(e) => { setCity(e.target.value) }} onClick={() => inputClick(7)} onBlur={() => inputBlur(7)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AlternateEmailIcon className='register-icon-1' style={{ color: inputActived4 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入邮箱' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} onClick={() => inputClick(4)} onBlur={() => inputBlur(4)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PolylineIcon className='register-icon-1' style={{ color: inputActived5 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='请输入邀请码' value={inviteNum} onChange={(e) => { setInviteNum(e.target.value) }} onClick={() => inputClick(5)} onBlur={() => inputBlur(5)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Register