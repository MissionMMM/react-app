import './register.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

    const back = () => {
        navigate('/login')
    }
    return (
        <div className='register-box'>
            <Button color="secondary" className='register-siderbar left-animation' style={{ left: '10%', fontSize: '20px' }} onClick={() => { back() }}><ArrowBackIosNewIcon style={{ color: 'pink', fontSize: '20px', fontWeight: 'bold',cursor:'pointer' }} onClick={() => back()} /><span className='register-text-1'>BACK</span></Button>
            <div className='register-content'>
                <div className='register-item'>
                    <view></view>
                </div>
                <div className='register-item'>
                    <span>用户名</span>
                </div>
                <div className='register-item'>
                    <span>账号ID</span>
                </div>
                <div className='register-item'>
                    <span>密码</span>
                </div>
                <div className='register-item'>
                    <span>邀请码</span>
                </div>
            </div>
            <Button color="secondary" className='register-siderbar right-animation' style={{ right: '10%' }}><span className='register-text-1'>NEXT</span><ArrowForwardIosIcon style={{ color: 'pink', fontSize: '20px', fontWeight: 'bold',cursor:'pointer' }} /></Button>
        </div>
    )
}

export default Register