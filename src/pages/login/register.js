import './register.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import PolylineIcon from '@mui/icons-material/Polyline';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Register() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [inviteNum, setInviteNum] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const back = () => {
        navigate('/login')
    }
    const showPw = () => {
        setShowPassword(true)
    }
    const hidePw = () => {
        setShowPassword(false)
    }
    return (
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
                        <AccountBoxIcon className='register-icon-1' />
                        <input className='register-input' placeholder='请输入注册用户名' value={userId} onChange={(e) => { setUserId(e.target.value) }}/>
                    </div>
                </div>
                {/* password box */}
                <div className='register-item'>
                    <div className='register-input-box'>
                        <KeyIcon className='register-icon-1' />
                        <input className='register-input' type={showPassword ? 'text' : 'password'} placeholder='请输入密码' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }}/>
                        {showPassword ?
                            <RemoveRedEyeIcon className='register-icon-2' onClick={() => hidePw()} /> : <VisibilityOffIcon className='register-icon-2' onClick={() => showPw()} />
                        }

                    </div>
                </div>
                <div className='register-item'>
                    <div className='register-input-box'>
                        <PhoneIcon className='register-icon-1' />
                        <input className='register-input' placeholder='请输入手机号' maxLength={11} value={userPhone} onChange={(e) => { setUserPhone(e.target.value) }}/>
                    </div>
                </div>
                <div className='register-item'>
                    <div className='register-input-box'>
                        <AlternateEmailIcon className='register-icon-1' />
                        <input className='register-input' placeholder='请输入邮箱' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }}/>
                    </div>
                </div>
                <div className='register-item'>
                    <div className='register-input-box'>
                        <PolylineIcon className='register-icon-1' />
                        <input className='register-input' placeholder='请输入邀请码' value={inviteNum} onChange={(e) => { setInviteNum(e.target.value) }}/>
                    </div>
                </div>
            </div>
            <Button color="secondary" className='register-siderbar right-animation' style={{ right: '10%' }}><span className='register-text-1'>NEXT</span><ArrowForwardIosIcon style={{ color: 'pink', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }} /></Button>
        </div>
    )
}

export default Register