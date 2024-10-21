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
    const [weatherInfoLoading, setWeatherInfoLoading] = useState(false)

    const getWeather = (e) => {
        setWeatherInfoLoading(true)
        let city = e || "深圳市"
        get(`/instrument/weather/`, { city: city }).then(res => {
            console.log('我是res1235', res)
            if (res.address && res.address.length > 0) {
                setWeatherInfo(res)
                setWeatherDetailInfo(res.forecasts[0])
                setWeatherInfoLoading(false)
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
                                <ThemeProvider theme={theme} key={index}>
                                    <Button color="ochre" variant="outlined" startIcon={<CalendarMonthIcon />} style={{ margin: '5px 0' }} onClick={() => changeDate(index)}>
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
                    <div className="contentText">日期：{weatherDetailInfo.date}</div>
                    <div className="contentText">白天描述：{weatherDetailInfo.dayWeather}</div>
                    <div className="contentText">白天溫度：{weatherDetailInfo.dayTemp}</div>
                    <div className="contentText">晚上描述：{weatherDetailInfo.nightWeather}</div>
                    <div className="contentText">晚上溫度：{weatherDetailInfo.nightTemp}</div>
                </div>
            }
            <div className={`weatherLogoLine ${weatherInfoLoading ? 'weatherLogoAni' : ''}`}>
                <div className="weatherLogo">{weatherInfoLoading ? '加载' : '氣象'}</div>
            </div>
        </div>
    )
})

export default WeatherCom