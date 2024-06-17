import { get } from "../../utils/request";
import { useEffect } from "react";

const NewCom = () => {
    const getNewList = () => {
        get("https://cn.apihz.cn/api/xinwen/weibo.php", { id: '88888888', key: '88888888' }).then(res => {
            console.log('我是res:', res)
        })
    }
    useEffect(() => {
        // getNewList()
    }, [])
    return (
        <div>我是新闻组件</div>
    )
}

export default NewCom