// 导入样式
import './App.css'
// import { fetchChannelList } from './store/modules/channelStore'
import BackgroundImage from '../content/backgroundImage'
import { useEffect, useState } from 'react'
// import MouseParticles from 'react-mouse-particles'

function App() {
  const [systemWidth, setSystemWidth] = useState("") // 响应式处理
  const resizeUpdate = (e) => {
    setSystemWidth(e.target.innerWidth)
  }
  useEffect(() => {
    setSystemWidth(window.innerWidth)
    window.addEventListener('resize', resizeUpdate)
    return () => {
      window.removeEventListener('resize', resizeUpdate)
    }
  }, [])
  useEffect(() => {
    console.log('我是系统宽度：', systemWidth)
  }, [systemWidth])

  return (
    <div className="App">
      <BackgroundImage />
      {/* <MouseParticles g={1} num={8} color={['#fff','#a05864','#a05864','a05864']} cull="col,image-wrapper"/> */}
    </div>
  );
}

export default App;
