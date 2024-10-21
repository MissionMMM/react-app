import './Home.css'
import TabBar from '../content/TabBar'
import HomeMainContent from '../content/HomeMainContent'
// import MouseParticles from 'react-mouse-particles'

function Home(e) {
    return (
        <div className='box'>
            <TabBar/>
            <HomeMainContent/>
            {/* <MouseParticles g={1} num={8} color={['#fff','#a05864','#a05864','a05864']} cull="col,image-wrapper"/> */}
            <div className="home-bottom-text">Created at May 23th,2024 in ShenZhen,China</div>
        </div>
    )
}

export default Home