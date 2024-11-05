import { useEffect, useState } from "react"
import { get } from "../../utils/request"
import "./MessageBorad.css"

import { traditionalized } from "../../utils/simpleTraditionalizedExchange"

function MessageBorad() {
    const [messageList, setMassageList] = useState([])

    const requestList = () => {
        get('users/', { type: 'all' })
            .then(res => { })
    }
    useEffect(() => {
        // requestList()
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