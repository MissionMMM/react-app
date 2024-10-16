import { useEffect, useState } from "react";
import "./instrument.css"
// import { useNavigate } from "react-router-dom";
import cityCode from "./cityCode.js"
import Dialog from '@mui/material/Dialog';
import SuccessAlert from '../alert/successAlert.js'
import InfoAlert from '../alert/infoAlert.js'
import { ReactComponent as Test_1 } from './Components/test_1.svg'
import CoPresentIcon from '@mui/icons-material/CoPresent';

function Instrument() {
    const [IDcardNumber, setIDcardNumber] = useState("") // 身份证号码
    const [IDInfo, setIDInfo] = useState({}) // 身份信息集合
    const [openDialog, setOpenDialog] = useState(false) // 打开dialog窗口
    const [openAlert, setOpenAlert] = useState(false) // 打开成功alert弹窗提示
    const [openInfoAlert, setOpenInfoAlert] = useState(false) // 打开信息alert弹窗提示
    const [dialogStatus, setDialogStatus] = useState(0) // 设置dialog窗口类型  1 时间戳表 / 0 身份证信息
    const [alertText, setAlertText] = useState("") // alert弹窗文案
    const [colorContent, setColorcontent] = useState("") // 拾色器内的颜色
    const [colorSelectShow, setColorSelectShow] = useState(false) // 拾色器展示
    const [personSearchBoxShow, setPersonSearchBoxShow] = useState(false) // 身份证信息弹出窗开关
    const [personSearchShowOnce, setPersonSearchShowOnce] = useState(false) // 身份证弹出首次

    // const navigate = useNavigate() // 路由跳转

    // 拾色器
    const catchColor = () => {
        const eyeDropper = new window.EyeDropper();
        eyeDropper.open().then(res => {
            setColorcontent(res.sRGBHex)
            document.getElementById('colorText').innerHTML = res.sRGBHex;
            document.getElementById('colorText').style.backgroundColor = res.sRGBHex;
            document.getElementById('colorText').style.color = "#fff";
        }).catch(err => {
        });
    }

    const closeInfoAlert = () => {
        setOpenInfoAlert(false)
    }
    const closeSuccessAlert = () => {
        setOpenAlert(false)
    }

    const searchInfo = () => {
        if (IDcardNumber == "") {
            setAlertText("请输入身份证号后再操作")
            setOpenInfoAlert(true)
            return
        }
        if (IDcardNumber.length != 18) {
            setAlertText("身份证号码有误")
            setOpenInfoAlert(true)
            return
        }
        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const checkcodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += weights[i] * parseInt(IDcardNumber.charAt(i), 10);
        }
        const mod = sum % 11;
        const checkcode = checkcodes[mod];
        const isValid = checkcode === IDcardNumber.charAt(17).toUpperCase();
        if (isValid) {
            // setAlertText("身份证号码有效")
            // setOpenInfoAlert(true)
        } else {
            setAlertText("身份证号码无效")
            setOpenInfoAlert(true)
            return
        }
        let IDage = getAge(IDcardNumber)
        let IDAddress = getAddressInfo(IDcardNumber)
        let IDSex = getSex(IDcardNumber)
        let IDAnimal = getAnimals(IDcardNumber)
        let IDConstellation = getConstellation(IDcardNumber)
        setIDInfo({ age: IDage, address: IDAddress, sex: IDSex, animal: IDAnimal, constellation: IDConstellation })
        setDialogStatus(0)
        setOpenDialog(true)
    }
    const clearInputInfo = () => {
        setIDcardNumber("")
        setIDInfo({})
    }

    // 获取地址信息
    const getAddressInfo = (identityCard) => {
        let six = identityCard.slice(0, 6)
        let four = six.slice(0, 4) + '00'
        let two = six.slice(0, 2) + '0000'
        // 地区
        let address = ''
        // 城市
        let city = ''
        // 省份
        let province = ''
        cityCode.forEach(item => {
            if (six == item.code) {
                address = item.address
            }
            if (four == item.code) {
                city = item.address
            }
            if (two == item.code) {
                province = item.address
            }
        })
        return province + city + address
    }
    // 获取年龄
    const getAge = (identityCard) => {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 0;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 0;
            }
        }
        var strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    // 获取性别
    const getSex = (identityCard) => {
        let gender = identityCard.slice(14, 17) % 2 ? "1" : "2"; // 1代表男性，2代表女性
        gender == "1" ? gender = '男' : gender = '女'
        return gender
    }
    // 获取生肖
    const getAnimals = (identityCard) => {
        let start = 1901
        let end = Number(identityCard.substr(6, 4))
        let x = (start - end) % 12
        let val = ''
        if (x == 1 || x == -11) val = '鼠'
        else if (x == 0) val = '牛'
        else if (x == 11 || x == -1) val = '虎'
        else if (x == 10 || x == -2) val = '兔'
        else if (x == 9 || x == -3) val = '龙'
        else if (x == 8 || x == -4) val = '蛇'
        else if (x == 7 || x == -5) val = '马'
        else if (x == 6 || x == -6) val = '羊'
        else if (x == 5 || x == -7) val = '猴'
        else if (x == 4 || x == -8) val = '鸡'
        else if (x == 3 || x == -9) val = '狗'
        else if (x == 2 || x == -10) val = '猪'
        return val
    }
    // 获取星座
    const getConstellation = (identityCard) => {
        let b = identityCard.substr(10, 4)
        let m = Number(b.substr(0, 2))
        let d = Number(b.substr(2))
        let val = ""
        if ((m == 1 && d <= 21) || (m == 2 && d <= 19)) {
            val = "水瓶座"
        } else if ((m == 2 && d > 20) || (m == 3 && d <= 20)) {
            val = "双鱼座"
        } else if ((m == 3 && d > 20) || (m == 4 && d <= 20)) {
            val = "白羊座"
        } else if ((m == 4 && d > 20) || (m == 5 && d <= 21)) {
            val = "金牛座"
        } else if ((m == 5 && d > 21) || (m == 6 && d <= 21)) {
            val = "双子座"
        } else if ((m == 6 && d > 21) || (m == 7 && d <= 22)) {
            val = "巨蟹座"
        } else if ((m == 7 && d > 22) || (m == 8 && d <= 23)) {
            val = "狮子座"
        } else if ((m == 8 && d > 23) || (m == 9 && d <= 23)) {
            val = "处女座"
        } else if ((m == 9 && d > 23) || (m == 10 && d <= 23)) {
            val = "天秤座"
        } else if ((m == 10 && d > 23) || (m == 11 && d <= 22)) {
            val = "天蝎座"
        } else if ((m == 11 && d > 22) || (m == 12 && d <= 21)) {
            val = "射手座"
        } else if ((m == 12 && d > 21) || (m == 1 && d <= 20)) {
            val = "魔羯座"
        }
        return val
    }

    const dialogHandleClickOpen = () => {
        setDialogStatus(1)
        setOpenDialog(true)
    }
    const dialogHandleClickOpenSVG = () => {
        setDialogStatus(2)
        setOpenDialog(true)
    }
    const dialogHandleClose = () => {
        setOpenDialog(false)
    }
    const copyCode = async (e) => {
        await navigator.clipboard.writeText(e);
        setAlertText("复制成功")
        setOpenAlert(true)
    }
    const copyColor = async () => {
        if (!colorContent) {
            setAlertText("请先拾取颜色")
            setOpenInfoAlert(true)
            return
        }
        await navigator.clipboard.writeText(colorContent);
        setAlertText("颜色已复制")
        setOpenAlert(true)
    }
    const jumpURLByHistory = (e) => {
        let url = ""
        switch (e) {
            case 1:
                url = "https://tools.fun/color.html"
                break;
            case 2:
                url = "https://mui.com/material-ui/getting-started/"
                break;
            case 3:
                url = "https://react.docschina.org/learn"
                break;
            case 4:
                url = "https://openrouter.ai/docs#quick-start"
                break;
            case 5:
                url = "https://tool.lu/timestamp/"
                break;
            case 6:
                url = "https://starloom.ai/#/"
                break;
            case 7:
                url = "https://bucd.pro/"
                break;
            case 8:
                url = "https://www.runoob.com/w3c/w3c-intro.html"
                break;
            case 9:
                url = "https://www.w3school.com.cn/"
                break;
            case 10:
                url = "https://www.liblib.art/?from=aigc.cn"
                break;
            case 11:
                url = "https://www.mxnzp.com/doc/detail?id=7"
                break;
            case 12:
                url = "https://tool.chinaz.com/"
                break;
            case 13:
                url = "https://console.ucloud.cn/"
                break;
            case 14:
                url = "https://home.console.aliyun.com/home/dashboard/ProductAndService?spm=5176.29379033.J_4VYgf18xNlTAyFFbOuOQe.d_console.775c75967ffXZJ"
                break;
            case 15:
                url = "https://mui.com/material-ui/material-icons/"
                break;
            default:
                break;
        }
        window.open(url, '_blank')
    }
    // 计算身份证信息弹出窗口
    const computedPerson = () => {
        setPersonSearchShowOnce(true)
        setPersonSearchBoxShow(!personSearchBoxShow)
    }
    useEffect(() => {
        console.log('personSearchBoxShow变化啦!:', personSearchBoxShow)
    }, [personSearchBoxShow])
    useEffect(() => {
        if (window.EyeDropper && window.EyeDropper.prototype.open) {
            // const eyeDropper = new window.EyeDropper({
            //   oncancel: () => console.log('Color picker was cancelled'),
            //   oncolorchange: (event) => console.log(event.color)
            // });
            // eyeDropper.open();
            setColorSelectShow(true)
        } else {
            // 提供备选方案
            setColorSelectShow(false)
        }
    }, [colorSelectShow])

    return (
        <div className="instrumentBox">
            <InfoAlert alertOpen={openInfoAlert} alertText={alertText} handleClose={closeInfoAlert} />
            <SuccessAlert alertOpen={openAlert} alertText={alertText} handleClose={closeSuccessAlert} />
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <div className="personSwitchBox" style={{ width: personSearchBoxShow ? '100px' : '90px' }} onClick={() => computedPerson()}>
                    <CoPresentIcon style={{ color: '#fff', fontSize: '30px', marginLeft: '10px' }} />
                    <div className="person-rightOn personLogo1">{personSearchBoxShow ? '<' : '>'}</div>
                    <div className="person-rightOn personLogo2">{personSearchBoxShow ? '<' : '>'}</div>
                    <div className="person-rightOn personLogo3">{personSearchBoxShow ? '<' : '>'}</div>
                </div>
                <div className={[personSearchBoxShow ? "rightContentShow" : "rightContentHide", "rightContent"].join(' ')} style={{ display: personSearchShowOnce ? '' : 'none' }}>
                    <input id="ageInput" className="ageInput" type="text" placeholder="身份證信息計算" value={IDcardNumber} onChange={(e) => setIDcardNumber(e.target.value.trim())} />
                    <button id="IDButton" className="IDButton" onClick={() => searchInfo()}>確 定</button>
                    <button id="clearButton" className="clearButton" onClick={() => clearInputInfo()}>清 空</button>
                </div>
            </div>
            <div className="flexBox">
                <div className="openTimestamps" onClick={dialogHandleClickOpen}>打開時間戳計算表</div>
                <div className="openSvg" onClick={dialogHandleClickOpenSVG}>打開SVG練習板</div>
            </div>
            <div className="flexBox">
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(1) }}>在綫工具</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(2) }}>MaterialUI</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(15) }}>MaterialUI-Icon</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(3) }}>React</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(4) }}>OpenRouter</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(5) }}>時間戳轉換工具</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(6) }}>天機閣</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(8) }}>W3C菜鳥教程</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(9) }}>W3School</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(10) }}>LibLib</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(11) }}>ROLL天氣查詢API</div>
                <div className="jumpSwitch" onClick={() => { jumpURLByHistory(12) }}>站長工具</div>
            </div>
            <div className="flexBox">
                <div className="jumpSwitch-2" onClick={() => { jumpURLByHistory(7) }}>Bucd梯子</div>
                <div className="jumpSwitch-2" onClick={() => { jumpURLByHistory(13) }}>UCloud控制臺</div>
                <div className="jumpSwitch-2" onClick={() => { jumpURLByHistory(14) }}>阿里雲域名控制臺</div>
            </div>
            <Dialog onClose={() => dialogHandleClose()} open={openDialog}>
                <SuccessAlert alertOpen={openAlert} alertText={alertText} handleClose={closeSuccessAlert} />
                {dialogStatus === 0 && (
                    <div className="dialog-box">
                        <div className="resultBox">
                            <div className="itemBox">
                                <div className="text-1">年齡：</div>
                                <div className="text2 text-2">{IDInfo.age ? IDInfo.age : '(此处显示年龄)'}</div>
                            </div>
                            <div className="itemBox">
                                <div className="text-1">籍貫：</div>
                                <div className="text2 text-2">{IDInfo.address ? IDInfo.address : '(此处显示地址)'}</div>
                            </div>
                            <div className="itemBox">
                                <div className="text-1">性別：</div>
                                <div className="text2 text-2">{IDInfo.sex ? IDInfo.sex : '(此处显示性别)'}</div>
                            </div>
                            <div className="itemBox">
                                <div className="text-1">屬相：</div>
                                <div className="text2 text-2">{IDInfo.animal ? IDInfo.animal : '(此处显示生肖)'}</div>
                            </div>
                            <div className="itemBox">
                                <div className="text-1">星座：</div>
                                <div className="text2 text-2">{IDInfo.constellation ? IDInfo.constellation : '(此处显示星座)'}</div>
                            </div>
                        </div>
                    </div>
                )}
                {dialogStatus === 1 && (
                    <div className="dialog-box">
                        <div className="dialog-box-title">点击内容复制</div>
                        <div className="dialog-text-1 dialog-item">一小时的时间戳:<span className="dialog-text-2" onClick={() => copyCode(3600000)}>3600000</span></div>
                        <div className="dialog-text-1 dialog-item">一天的时间戳:<span className="dialog-text-2" onClick={() => copyCode(86400000)}>86400000</span></div>
                        <div className="dialog-text-1 dialog-item">一个月的时间戳:<span className="dialog-text-2" onClick={() => copyCode(2592000000)}>2592000000</span></div>
                        <div className="dialog-text-1 dialog-item">一年的时间戳:<span className="dialog-text-2" onClick={() => copyCode(31104000000)}>31104000000</span></div>
                    </div>
                )}
                {
                    dialogStatus === 2 && (
                        <div className="dialog-box">
                            {/* 富圈圈LOGO */}
                            <Test_1 style={{ width: '100px', height: '100px', border: '3px solid pink', padding: '10px', borderRadius: '10px' }} />
                        </div>
                    )
                }
            </Dialog>
            {colorSelectShow && (<div className="colorContainer">
                <div className="text-1" style={{ fontSize: '30px' }}>拾色器</div>
                <div id="container" style={{ display: 'flex', flexFlow: 'column', marginTop: '30px', alignItems: 'center' }}>
                    <span id="colorText" className="colorText" onClick={() => copyColor()}>此處展示顔色</span>
                    <button id="getColor" onClick={() => catchColor()}>拾 取</button>
                </div>
            </div>)}
        </div>
    );
}

export default Instrument;