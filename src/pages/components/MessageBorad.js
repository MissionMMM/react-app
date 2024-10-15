import { useEffect, useState } from "react"
import { get } from "../../utils/request"
import "./MessageBorad.css"

function MessageBorad() {
    const [messageList, setMassageList] = useState([])

    const requestList = () => {
        get('users/', { type: 'all' })
            .then(res => { console.log('我是res:', res) })
            .catch(error => {
                if (error.response) {
                    // 请求已发出但服务器响应的状态码不在2xx范围内
                    console.error("Error response:", error.response.data);
                    console.error("Status Code:", error.response.status);
                } else if (error.request) {
                    // 请求已创建但没有收到响应
                    console.error("No response received:", error.request);
                } else {
                    // 设置请求时发生了一些问题
                    console.error("Error setting up the request:", error.message);
                }
                console.error(error.config);
            })
    }
    useEffect(() => {
        requestList()
    }, [])
    return (
        <div className="message-borad-box">
            <div className="message-borad-title">- Message Borad -</div>
            <div className="message-borad-content">
                <div className="message-borad-item">
                    <div className="message-item-title-box">
                        <div className="message-item-text-1">用户昵称</div>
                        <div className="message-item-text-2">2024-10-15</div>
                    </div>
                    <div className="message-item-address">地区：深圳</div>
                    <div className="message-item-content">我是消息内容的洒家打开手机按常理撒娇零地价萨兰迪加萨兰迪加萨里的加萨里的i加萨莉打算</div>
                    <div className="message-borad-corner" />
                </div>
            </div>
        </div>
    )
}

export default MessageBorad