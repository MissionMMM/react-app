import { useEffect, useState } from "react"
import { get } from "../../utils/request";

function WeatherCom() {
    const [weatherInfo, setWeatherInfo] = useState({})
    const getWeather = () => {
        let app_id = 'ihhxoekgltmhsext'
        let app_secret = 'deDxMPCqNNFmkbG4ULw2LDjVVBS7JIhM'
        get(`https://www.mxnzp.com/api/weather/forecast/${'深圳市'}`, { app_id: app_id, app_secret: app_secret }).then(res => {
            console.log('我是天气：', res)
            if (res.code == 1) {
                setWeatherInfo(res.data)
            }
        })
    }
    useEffect(() => {
        getWeather()
    }, [])
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div>城市：{weatherInfo.address}</div>
            <div>更新时间：{weatherInfo.forecasts
            [0].reportTime}</div>
            <div>天气预报日期：{weatherInfo.forecasts
            [0].date}</div>
            <div>白天天气描述：{weatherInfo.forecasts
            [0].dayWeather}</div>
            <div>白天温度：{weatherInfo.forecasts
            [0].dayTemp}</div>
            <div>晚上天气描述：{weatherInfo.forecasts
            [0].nightWeather}</div>
            <div>晚上温度：{weatherInfo.forecasts
            [0].nightTemp}</div>
        </div>
    )
}

export default WeatherCom