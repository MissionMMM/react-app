import { get, post } from "../../utils/requestOut";
import { useEffect } from "react";

// key
// APIKey:UdKee2QOF7L63zzZwO8nTTZi
// SKey:4mxj8a1n6Vm3SfhRAaRMZBjrrSUDO0

const NewCom = () => {
    let APIKey = "UdKee2QOF7L63zzZwO8nTTZi"
    let SecretKey = "4mxj8a1n6Vm3SfhRAaRMZBjrrSUDO0"
    const getNewList = () => {
        post("https://aip.baidubce.com/oauth/2.0/token", { grant_type: 'client_credentials', client_id: APIKey, client_secret: SecretKey }).then(res => {
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