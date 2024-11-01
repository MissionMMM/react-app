import ThreeScene from "./Components/ThreeScene"

function ThreeDDemo() {
    return (
        <div style={{ width:'100vw',height:'100vh',color: '#fff',display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center' }}>
            <h1>这是一个3D-DEMO</h1>
            <h3 style={{marginTop:'-10px'}}>左键点击拖动相机视角,右键点击拖动物体旋转,滚轮控制物体放大/缩小</h3>
            <ThreeScene/>
        </div>
    )
}

export default ThreeDDemo