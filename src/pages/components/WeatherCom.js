import { useEffect, useState, useImperativeHandle, forwardRef } from "react"
import { get } from "../../utils/request";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './WeatherCom.css';

const theme = createTheme({
    palette: {
        ochre: {
            main: '#fcadc7',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    },
});

const WeatherCom = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => (
            { getWeather }
        )
    ) //父组件通过ref获取值，要在这里抛出

    const [weatherInfo, setWeatherInfo] = useState({})
    const [weatherDetailInfo, setWeatherDetailInfo] = useState({})
    const getWeather = (e) => {
        let city = e || "深圳市"
        let app_id = 'ihhxoekgltmhsext'
        let app_secret = 'deDxMPCqNNFmkbG4ULw2LDjVVBS7JIhM'
        get(`https://www.mxnzp.com/api/weather/forecast/${city}`, { app_id: app_id, app_secret: app_secret }).then(res => {
            if (res.code == 1) {
                setWeatherInfo(res.data)
                setWeatherDetailInfo(res.data.forecasts[0])
            }
        })
    }
    const openFatherDialog = () => {
        props.clickFun()
    }
    const changeDate = (index) => {
        setWeatherDetailInfo(weatherInfo.forecasts[index])
    }
    useEffect(() => {
        getWeather()
    }, [])
    return (
        <div className="weather-box">
            {Object.keys(weatherInfo).length > 0 &&
                <div>
                    <div className="weather-title" onClick={() => openFatherDialog()}>{weatherInfo.address}</div>
                    <div className="weather-dateChoseBox">
                        {weatherInfo.forecasts.map((item, index) => {
                            return (
                                <ThemeProvider theme={theme}>
                                    <Button color="ochre" variant="outlined" startIcon={<CalendarMonthIcon />} key={index} style={{ margin: '5px 0' }} onClick={() => changeDate(index)}>
                                        {item.date}
                                    </Button>
                                </ThemeProvider>
                            )
                        })}
                    </div>
                </div>
            }
            {Object.keys(weatherDetailInfo).length > 0 &&
                <div className="weather-content">
                    <div>天气预报日期：{weatherDetailInfo.date}</div>
                    <div>白天天气描述：{weatherDetailInfo.dayWeather}</div>
                    <div>白天温度：{weatherDetailInfo.dayTemp}</div>
                    <div>晚上天气描述：{weatherDetailInfo.nightWeather}</div>
                    <div>晚上温度：{weatherDetailInfo.nightTemp}</div>
                </div>
            }
            <div className="weatherLogoLine">
                <div className="weatherLogo">氣象</div>
            </div>
        </div>
    )
})

export default WeatherCom