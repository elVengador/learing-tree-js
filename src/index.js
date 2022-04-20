import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const drawLine = (scene) => {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(- 10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const line = new THREE.Line(geometry, material)
    scene.add(line)
}

const drawCube = (scene) => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: '#fff' });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

const drawText = (scene) => {
    const loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/gentilis_bold.typeface.json', function (font) {

        const geometry = new THREE.TextGeometry('elVengador', {
            font: font,
            size: 1,
            height: 0.2,
        });
        // const geometry = new THREE.TextGeometry('elVengador', { size: 80, });
        const material = new THREE.MeshBasicMaterial({ color: '#faa' });

        const text = new THREE.Mesh(geometry, material);
        scene.add(text);
    });

}

const drawModel = (scene) => {
    const loader = new GLTFLoader();
    loader.load('assets/shiba/scene.gltf', function (gltf) {

        // gltf.asset('')
        const scale = 1
        gltf.scene.scale.set(scale, scale, scale)

        scene.add(gltf.scene);

    }, undefined, function (error) {

        console.error(error);

    });
}

const scene = new THREE.Scene();
// FOV: fisrt of view
// aspect ratio
// near and far
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);



drawLine(scene)
// drawCube(scene)
// drawText(scene)
drawModel(scene)


camera.position.z = 5;


function animate() {
    const rotation = 0.05
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // cube.rotation.x += rotation;
    // cube.rotation.y += rotation;
}
animate();


