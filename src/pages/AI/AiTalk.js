import { useEffect, useState } from 'react'
import ErrorAlert from '../alert/errorAlert';
import LogoutIcon from '@mui/icons-material/Logout';
import LinearProgress from '@mui/material/LinearProgress';
import OpenAI from "openai"
import './AiTalk.css'

const $YOUR_SITE_URL = "http://localhost:3000/"
const $YOUR_SITE_NAME = "Misn"
const $OPENROUTER_API_KEY = "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"

function AiTalk() {
    const [talkList, setTalkList] = useState([
        /* { role: 'ME', content: '芜湖~~~' },
        { role: 'ME', content: '啦啦啦啦啦啦啦啦啦啦啦啦' },
        { role: 'GPT', content: '瓦勒个去' }, */
    ])
    const [talkContent, setTalkContent] = useState("")
    const [openAlert, setOpenAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const [showLoading, setShowLoading] = useState(false)

    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: $OPENROUTER_API_KEY,
        defaultHeaders: {
            "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
            "X-Title": $YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
        },
        dangerouslyAllowBrowser: true,
    })
    async function main() {
        const completion = await openai.chat.completions.create({
            model: "openchat/openchat-7b:free",
            messages: [
                { role: "user", content: talkContent }
            ],
        })
        // console.log(completion.choices[0].message)
        let aiReply = completion.choices[0].message
        let aiContentObj = {
            role: "GPT",
            content: aiReply.content
        }
        setTalkList((pre) => { return [...pre, aiContentObj] })
        setShowLoading(false)
        setTimeout(() => {
            window.location.href = "#scrollBottom"
            document.getElementById("myInput").focus()
        }, 100);
    }
    const sendMessage = () => {
        if (!talkContent) {
            setAlertText("请输入对话内容")
            return setOpenAlert(true)
        }
        let contentObj = {
            role: "ME",
            content: talkContent
        }
        setTalkList([...talkList, contentObj])
        setTalkContent("")
        setTimeout(() => {
            window.location.href = "#scrollBottom"
            document.getElementById("myInput").focus()
        }, 100);
        setShowLoading(true)
        main()
    }
    const changeTalkContent = (e) => {
        let value = e
        // 识别emo表情并删除
        const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig
        if (reg.test(value)) {
            value = value.replace(reg, "")
            setAlertText("请勿输入特殊符号")
            setOpenAlert(true)
        }
        setTalkContent(value)
    }
    const closeSuccessAlert = () => {
        setOpenAlert(false)
    }
    const inputKey = (e) => {
        if (e == "Enter" || e == "NumpadEnter") {
            sendMessage()
        }
    }
    useEffect(() => {

    }, [talkList])
    return (
        <div className='AiTalkBox'>
            <ErrorAlert alertOpen={openAlert} alertText={alertText} handleClose={closeSuccessAlert} />
            <div className='AiTalkContent'>
                <div className='AiTalkMainBox'>
                    {
                        talkList.map((item, index) => {
                            return (
                                <div className='AiTalkMain-item' key={index}>
                                    <div className='avator' style={{ backgroundColor: item.role == "ME" ? 'pink' : 'rgb(134, 194, 132)', boxShadow: item.role == "ME" ? '0px 0px 3px 3px pink' : '0px 0px 3px 3px rgb(134, 194, 132)' }}>{item.role}</div>
                                    <div className='talkContent'>
                                        {item.content.split('\n').map((items,indexs)=>{
                                            return (<div key={indexs}>{items}</div>)
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        showLoading ? <LinearProgress color="inherit" style={{ width:'60%',marginTop: '20px',marginLeft:'20%' }} /> : ''
                    }
                    <div id='scrollBottom' style={{ height: '80px' }}></div>
                </div>
                <div className='AiTalk-inputBox'>
                    <input id="myInput" type='text' placeholder='Message ChatGPT' className='AiTalk-input' value={talkContent} onChange={(e) => changeTalkContent(e.target.value)} onKeyDown={e => inputKey(e.code)} />
                    <LogoutIcon className='sendIcon' onClick={() => sendMessage()} />
                </div>
            </div>
        </div >
    )
}

export default AiTalk