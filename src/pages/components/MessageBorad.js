import { useEffect, useState } from "react"
import { get } from "../../utils/request"
import "./MessageBorad.css"

import { traditionalized } from "../../utils/simpleTraditionalizedExchange"

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
                        <div className="message-item-text-1">{traditionalized('弥森')}</div>
                        <div className="message-item-text-2">2024-10-15 16:31</div>
                    </div>
                    <div className="message-item-address">{traditionalized('地区：深圳')}</div>
                    <div className="message-item-content">{traditionalized('welcome to my blog，虽然现在还什么都没有，但一切都是暂时的，好的也好坏的也罢')}</div>
                    <div className="message-borad-corner" />
                </div>
            </div>
        </div>
    )
}

export default MessageBorad