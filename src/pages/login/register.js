import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
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
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ErrorAlert from '../alert/errorAlert';
import country from "../../utils/country.json"
import birthDate from "../../utils/birthDate.json"

// 引入简体切繁体组件

function Register() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userNickname, setUserNickname] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [inviteNum, setInviteNum] = useState('')
    const [countryItem, setCountryItem] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [inputActived1, setInputActived1] = useState(false)
    const [inputActived2, setInputActived2] = useState(false)
    const [inputActived3, setInputActived3] = useState(false)
    const [inputActived4, setInputActived4] = useState(false)
    const [inputActived5, setInputActived5] = useState(false)
    const [inputActived6, setInputActived6] = useState(false)
    const [inputActived7, setInputActived7] = useState(false)
    const [inputActived8, setInputActived8] = useState(false)
    const [inputActived9, setInputActived9] = useState(false)
    const [inputActived10, setInputActived10] = useState(false)
    const [inputActived11, setInputActived11] = useState(false)
    const [systemWidth, setSystemWidth] = useState("") // 响应式处理
    const [openErrorAlert, setOpenErrorAlert] = useState(false) // 报错弹窗
    const [errorAlertText, setErrorAlertText] = useState("") // 报错弹窗文案
    const [countryList, setCountryList] = useState([]) // 国家列表
    const [provincesList, setProvincesList] = useState([])
    const [provincesItem, setProvincesItem] = useState({})
    const [cityList, setCityList] = useState([])
    const [cityItem, setCityItem] = useState([])
    const [yearList, setYearList] = useState([])
    const [year, setYear] = useState("")
    const [monthList, setMonthList] = useState([])
    const [month, setMonth] = useState("")
    const [dayList, setDayList] = useState([])
    const [day, setDay] = useState("")

    const resizeUpdate = (e) => {
        setSystemWidth(e.target.innerWidth)
    }
    useEffect(() => {
        setYearList(birthDate.Year)
        setMonthList(birthDate.Month)
        setDayList(birthDate.Day)
        setCountryList(country.countries)
        setSystemWidth(window.innerWidth)
        window.addEventListener('resize', resizeUpdate)
        return () => {
            window.removeEventListener('resize', resizeUpdate)
        }
    }, [])

    const choseCountry = (item) => {
        setCountryItem(item)
        if (item.provinces) {
            setProvincesList(item.provinces)
        } else {
            setProvincesList([])
            setProvincesItem({})
            setCityList([])
            setCityItem({})
        }
    }
    const choseProvinces = (item) => {
        setCityItem({})
        setProvincesItem(item)
        if (item.cities) {
            setCityList(item.cities)
        } else {
            setCityList([])
            setCityItem({})
        }
    }
    const choseCity = (item) => {
        setCityItem(item)
    }
    const choseYear = (item) => {
        setYear(item)
    }
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
            case 8:
                setInputActived8(true)
                break;
            case 9:
                setInputActived9(true)
                break;
            case 10:
                setInputActived10(true)
                break;
            case 11:
                setInputActived11(true)
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
            case 8:
                setInputActived8(false)
                break;
            case 9:
                setInputActived9(false)
                break;
            case 10:
                setInputActived10(false)
                break;
            case 11:
                setInputActived11(false)
                break;
        }
    }
    const confirm = () => {
        // console.log('我是用户名：', userId)
        // console.log('我是密码：', userPassword)
        // console.log('我是昵称：', userNickname)
        // console.log('我是手机号：', userPhone)
        // console.log('我是生日：', birthDate)
        // console.log('我是地区：', city)
        // console.log('我是邮箱：', userEmail)
        // console.log('我是邀请码：', inviteNum)
        if (!userId) {
            setErrorAlertText("请输入用户名")
            setOpenErrorAlert(true)
        }
    }
    const closeErrorAlert = () => {
        setOpenErrorAlert(false)
    }
    return (
        systemWidth >= 750 ? (
            <div className='register-box'>
                <ErrorAlert alertOpen={openErrorAlert} alertText={errorAlertText} handleClose={closeErrorAlert} />
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
                            <input className='register-input' placeholder='請輸入注冊用戶名' value={userId} onChange={(e) => { setUserId(e.target.value) }} onClick={() => inputClick(1)} onBlur={() => inputBlur(1)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <KeyIcon className='register-icon-1' style={{ color: inputActived2 ? '#333' : 'gray' }} />
                            <input className='register-input' type={showPassword ? 'text' : 'password'} placeholder='請輸入密碼' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} onClick={() => inputClick(2)} onBlur={() => inputBlur(2)} />
                            {showPassword ?
                                <RemoveRedEyeIcon className='register-icon-2' onClick={() => hidePw()} /> : <VisibilityOffIcon className='register-icon-2' onClick={() => showPw()} />
                            }

                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AddReactionIcon className='register-icon-1' style={{ color: inputActived8 ? '#333' : 'gray' }} />
                            <input className='register-input' type='text' placeholder='請輸入昵稱' maxLength={10} value={userNickname} onChange={(e) => { setUserNickname(e.target.value) }} onClick={() => inputClick(8)} onBlur={() => inputBlur(8)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PhoneIcon className='register-icon-1' style={{ color: inputActived3 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入11位手機號' maxLength={11} value={userPhone} onChange={(e) => { setUserPhone(e.target.value) }} onClick={() => inputClick(3)} onBlur={() => inputBlur(3)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <CakeIcon className='register-icon-1' style={{ color: inputActived6 ? '#333' : 'gray' }} />
                            <input className='register-input register-birth-year' type='text' readOnly placeholder='年份' value={year} onClick={() => inputClick(6)} onBlur={() => inputBlur(6)} />
                            <input className='register-input register-birth-month' type='text' readOnly placeholder='月份' value={month} onClick={() => inputClick(11)} onBlur={() => inputBlur(11)} />
                            <div className={['register-selector-box-base', inputActived6 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {yearList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseYear(item) }}>
                                            {item}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={['register-selector-box-base', inputActived11 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {monthList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseYear(item) }}>
                                            {item}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <LocationCityIcon className='register-icon-1' style={{ color: (inputActived7 || inputActived9 || inputActived10) ? '#333' : 'gray' }} />
                            <input className={['register-input register-selector', countryItem.id === 4 ? 'register-selector-china' : ''].join(' ')} type='text' readOnly placeholder='請選擇國家名' value={countryItem.name ? countryItem.name + ' ' + countryItem.chineseName : ""} onClick={() => inputClick(7)} onBlur={() => inputBlur(7)} />
                            {
                                provincesList.length > 0 &&
                                <input className='register-input register-selector-provinces' type='text' readOnly placeholder='省份' value={provincesItem.chineseName ? provincesItem.chineseName : ""} onClick={() => inputClick(9)} onBlur={() => inputBlur(9)} />
                            }
                            {
                                cityList.length > 0 &&
                                <input className='register-input register-selector-city' type='text' readOnly placeholder='城市' value={cityItem.chineseName ? cityItem.chineseName : ""} onClick={() => inputClick(10)} onBlur={() => inputBlur(10)} />
                            }
                            {/* 選擇國家 */}
                            <div className={['register-selector-box-base', inputActived7 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {countryList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseCountry(item) }}>
                                            {item.name + " " + item.chineseName}
                                        </div>
                                    )
                                })}
                            </div>
                            {/* 選擇省份 */}
                            <div className={['register-selector-box-base', inputActived9 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {provincesList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseProvinces(item) }}>
                                            {item.chineseName}
                                        </div>
                                    )
                                })}
                            </div>
                            {/* 選擇城市 */}
                            <div className={['register-selector-box-base', inputActived10 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {cityList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseCity(item) }}>
                                            {item.chineseName}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AlternateEmailIcon className='register-icon-1' style={{ color: inputActived4 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入郵箱' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} onClick={() => inputClick(4)} onBlur={() => inputBlur(4)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PolylineIcon className='register-icon-1' style={{ color: inputActived5 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入邀請碼' value={inviteNum} onChange={(e) => { setInviteNum(e.target.value) }} onClick={() => inputClick(5)} onBlur={() => inputBlur(5)} />
                        </div>
                    </div>
                </div>
                <Button color="secondary" className='register-siderbar right-animation' style={{ right: '10%' }} onClick={() => { confirm() }}><span className='register-text-1'>NEXT</span><ArrowForwardIosIcon style={{ color: 'pink', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }} /></Button>
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
                            <input className='register-input' placeholder='請輸入注冊用戶名' value={userId} onChange={(e) => { setUserId(e.target.value) }} onClick={() => inputClick(1)} onBlur={() => inputBlur(1)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <KeyIcon className='register-icon-1' style={{ color: inputActived2 ? '#333' : 'gray' }} />
                            <input className='register-input' type={showPassword ? 'text' : 'password'} placeholder='請輸入密碼' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} onClick={() => inputClick(2)} onBlur={() => inputBlur(2)} />
                            {showPassword ?
                                <RemoveRedEyeIcon className='register-icon-2' onClick={() => hidePw()} /> : <VisibilityOffIcon className='register-icon-2' onClick={() => showPw()} />
                            }

                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AddReactionIcon className='register-icon-1' style={{ color: inputActived8 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入昵稱' maxLength={10} value={userNickname} onChange={(e) => { setUserNickname(e.target.value) }} onClick={() => inputClick(8)} onBlur={() => inputBlur(8)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PhoneIcon className='register-icon-1' style={{ color: inputActived3 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入11位手機號' maxLength={11} value={userPhone} onChange={(e) => { setUserPhone(e.target.value) }} onClick={() => inputClick(3)} onBlur={() => inputBlur(3)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <CakeIcon className='register-icon-1' style={{ color: inputActived6 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入生日日期用 - 號連接' value={year} onClick={() => inputClick(6)} onBlur={() => inputBlur(6)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <LocationCityIcon className='register-icon-1' style={{ color: (inputActived7 || inputActived9 || inputActived10) ? '#333' : 'gray' }} />
                            <input className={['register-input register-selector', countryItem.id === 4 ? 'register-selector-china' : ''].join(' ')} type='text' readOnly placeholder='請選擇國家名' value={countryItem.name ? countryItem.name + ' ' + countryItem.chineseName : ""} onClick={() => inputClick(7)} onBlur={() => inputBlur(7)} />
                            {
                                provincesList.length > 0 &&
                                <input className='register-input register-selector-provinces' type='text' readOnly placeholder='省份' value={provincesItem.chineseName ? provincesItem.chineseName : ""} onClick={() => inputClick(9)} onBlur={() => inputBlur(9)} />
                            }
                            {
                                cityList.length > 0 &&
                                <input className='register-input register-selector-city' type='text' readOnly placeholder='城市' value={cityItem.chineseName ? cityItem.chineseName : ""} onClick={() => inputClick(10)} onBlur={() => inputBlur(10)} />
                            }
                            {/* 選擇國家 */}
                            <div className={['register-selector-box-base', inputActived7 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {countryList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseCountry(item) }}>
                                            {item.name + " " + item.chineseName}
                                        </div>
                                    )
                                })}
                            </div>
                            {/* 選擇省份 */}
                            <div className={['register-selector-box-base', inputActived9 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {provincesList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseProvinces(item) }}>
                                            {item.chineseName}
                                        </div>
                                    )
                                })}
                            </div>
                            {/* 選擇城市 */}
                            <div className={['register-selector-box-base', inputActived10 ? 'register-selector-box-show' : 'register-selector-box-hide'].join(' ')}>
                                {cityList.map((item) => {
                                    return (
                                        <div className='register-selector-item' key={item.id} onClick={() => { choseCity(item) }}>
                                            {item.chineseName}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <AlternateEmailIcon className='register-icon-1' style={{ color: inputActived4 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入郵箱' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} onClick={() => inputClick(4)} onBlur={() => inputBlur(4)} />
                        </div>
                    </div>
                    <div className='register-item'>
                        <div className='register-input-box'>
                            <PolylineIcon className='register-icon-1' style={{ color: inputActived5 ? '#333' : 'gray' }} />
                            <input className='register-input' placeholder='請輸入邀請碼' value={inviteNum} onChange={(e) => { setInviteNum(e.target.value) }} onClick={() => inputClick(5)} onBlur={() => inputBlur(5)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Register