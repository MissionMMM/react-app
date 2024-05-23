// 导入样式
import './App.css'
// import { fetchChannelList } from './store/modules/channelStore'
import BackgroundImage from '../content/backgroundImage'
// import MouseParticles from 'react-mouse-particles'

function App() {
  return (
    <div className="App">
      <BackgroundImage/>
      {/* <MouseParticles g={1} num={8} color={['#fff','#a05864','#a05864','a05864']} cull="col,image-wrapper"/> */}
    </div>
  );
}

export default App;
