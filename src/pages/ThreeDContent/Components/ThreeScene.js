import * as THREE from 'three';
import { useRef, useEffect, useState } from "react";

function ThreeScene() {
    const [widthSize, setWidthSize] = useState(800)
    const [heightSize, setHeightSize] = useState(600)
    const canvasRef = useRef(null)

    useEffect(() => {
        // 创建场景
        const scene = new THREE.Scene();

        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // 加载自定义贴图
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/2.png'); // 确保路径正确 public 下图片文件

        // 创建几何体
        const geometry = new THREE.SphereGeometry();
        const material = new THREE.MeshBasicMaterial({ map: texture });

        // 创建网格对象
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 添加方向光
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色光，强度为 1
        directionalLight.position.set(5, 5, 5); // 设置光源位置
        scene.add(directionalLight);

        // 添加点光源
        const pointLight = new THREE.PointLight(0xff0000, 1); // 红色光，强度为 1
        pointLight.position.set(-5, 5, 5); // 设置光源位置
        scene.add(pointLight);

        // 添加聚光灯
        const spotLight = new THREE.SpotLight(0x00ff00, 1); // 绿色光，强度为 1
        spotLight.position.set(5, -5, 5); // 设置光源位置
        spotLight.target.position.set(0, 0, 0); // 设置目标位置
        spotLight.angle = Math.PI / 4; // 设置聚光灯的角度
        spotLight.penumbra = 0.2; // 设置半影角度
        spotLight.decay = 2; // 设置衰减
        scene.add(spotLight);
        scene.add(spotLight.target);

        // 添加环境光
        const ambientLight = new THREE.AmbientLight(0x404040); // 灰色光
        scene.add(ambientLight);

        // 添加半球光
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // 天空颜色、地面颜色和强度
        scene.add(hemisphereLight);

        // 鼠标控制变量
        let isDraggingLeft = false;
        let isDraggingRight = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let rotateSpeed = 0.005; // 旋转速度
        let zoomSpeed = 0.1; // 缩放速度

        // 监听鼠标按下事件
        function onMouseDown(event) {
            if (event.button === 0) { // 左键
                isDraggingLeft = true;
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            } else if (event.button === 2) { // 右键
                isDraggingRight = true;
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            }
        }

        // 监听鼠标移动事件
        function onMouseMove(event) {
            if (isDraggingLeft) {
                const deltaX = event.clientX - lastMouseX;
                const deltaY = event.clientY - lastMouseY;

                // 旋转相机
                camera.rotation.y -= deltaX * rotateSpeed;
                camera.rotation.x -= deltaY * rotateSpeed;

                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            } else if (isDraggingRight) {
                const deltaX = event.clientX - lastMouseX;
                const deltaY = event.clientY - lastMouseY;

                // 旋转物体
                cube.rotation.y += deltaX * rotateSpeed;
                cube.rotation.x += deltaY * rotateSpeed;

                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            }
        }

        // 监听鼠标释放事件
        function onMouseUp() {
            isDraggingLeft = false;
            isDraggingRight = false;
        }

        // 监听滚轮事件
        function onMouseWheel(event) {
            const delta = Math.sign(event.deltaY) * -zoomSpeed;
            camera.position.z -= delta;
            camera.position.z = Math.max(1.2, camera.position.z); // 最小距离
        }

        // 添加事件监听器
        canvasRef.current.addEventListener('mousedown', onMouseDown);
        canvasRef.current.addEventListener('mousemove', onMouseMove);
        canvasRef.current.addEventListener('mouseup', onMouseUp);
        canvasRef.current.addEventListener('wheel', onMouseWheel);
        canvasRef.current.addEventListener('contextmenu', (event) => event.preventDefault()); // 禁用右键菜单

        // 渲染函数
        const animate = () => {
            requestAnimationFrame(animate);

            // 旋转立方体
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        // 开始动画
        animate();

        // 处理窗口大小变化
        const handleResize = () => {
            camera.aspect = widthSize / heightSize;
            camera.updateProjectionMatrix();
            renderer.setSize(widthSize, heightSize);
        };

        window.addEventListener('resize', handleResize);

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            canvasRef.current.removeEventListener('mousedown', onMouseDown);
            canvasRef.current.removeEventListener('mousemove', onMouseMove);
            canvasRef.current.removeEventListener('mouseup', onMouseUp);
            canvasRef.current.removeEventListener('wheel', onMouseWheel);
        };
    }, []);

    return (
        <canvas style={{ width: widthSize + 'px', height: heightSize + 'px', border: '1px solid #fff' }} ref={canvasRef} />
    )
}

export default ThreeScene