import { useEffect } from 'react';
import * as THREE from 'three';

function ThreeDTest() {
    const creat3DExample = () => {
        const width = window.innerWidth, height = window.innerHeight;
        // init
        const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
        camera.position.z = 1;
        const scene = new THREE.Scene();
        const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setAnimationLoop(animate);
        document.body.appendChild(renderer.domElement);
        let xxx = false
        let yyy = false
        // animation
        function animate(time) {
            var time_mirror = (time / 1000).toFixed(4)
            mesh.rotation.x = time_mirror / 2;
            mesh.rotation.y = time_mirror;
            if (yyy === false) {
                let timer_plus_y = setInterval(() => {
                    mesh.position.y += 0.0001
                    if (mesh.position.y > 0.4) {
                        clearInterval(timer_plus_y)
                        yyy = true
                    }
                }, 100);
            } else {
                let timer_minus_y = setInterval(() => {
                    mesh.position.y -= 0.0001
                    if (mesh.position.y < -0.4) {
                        clearInterval(timer_minus_y)
                        yyy = false
                    }
                }, 100);
            }
            if (xxx === false) {
                let timer_plus_x = setInterval(() => {
                    mesh.position.x += 0.0001
                    if (mesh.position.x > 0.9) {
                        clearInterval(timer_plus_x)
                        xxx = true
                    }
                }, 70);
            } else {
                let timer_minus_x = setInterval(() => {
                    mesh.position.x -= 0.0001
                    if (mesh.position.x < -0.9) {
                        clearInterval(timer_minus_x)
                        xxx = false
                    }
                }, 70);
            }
            // console.log('我是time:', time_mirror)
            renderer.render(scene, camera);
        }
    }
    useEffect(() => {
        creat3DExample()
    }, [])
}

export default ThreeDTest; 