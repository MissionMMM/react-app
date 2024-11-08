import './Home.css'
import TabBar from '../content/TabBar'
import HomeMainContent from '../content/HomeMainContent'
import { importKey, decrypt } from '../../utils/webCryptoAPI'
import { useEffect, useState } from 'react'
// import MouseParticles from 'react-mouse-particles'

function Home(e) {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        if (localStorage.getItem('key')) {
            let key = JSON.parse(localStorage.getItem('key'))
            let userInfo_mirror = JSON.parse(localStorage.getItem('userInfo'))
            importKey(key).then(importKeyValue => {
                decrypt(userInfo_mirror, importKeyValue).then(result => {
                    setUserInfo(JSON.parse(result))
                })
            })
        }
    }, [])
    return (
        <div className='box'>
            <TabBar userInfo={userInfo} />
            <HomeMainContent userInfo={userInfo} />
            {/* <MouseParticles g={1} num={8} color={['#fff','#a05864','#a05864','a05864']} cull="col,image-wrapper"/> */}
            <div className="home-bottom-text">Created at May 23th,2024 in ShenZhen,China</div>
        </div>
    )
}

export default Home