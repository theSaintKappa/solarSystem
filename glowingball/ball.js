//ball.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const progressContainer = document.querySelector('.progress-container');
const currentText = document.querySelector('.current-text');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');


THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log('Started loading file.');
    currentText.innerText = `Loading asset: ${url} (${itemsLoaded}/${itemsTotal})`;
};

THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    progressBar.value = (itemsLoaded / itemsTotal) * 100;

    currentText.innerText = `Loading asset: ${url} (${itemsLoaded}/${itemsTotal})`;
};

THREE.DefaultLoadingManager.onLoad = function() {
    console.log('Loading Complete!');
    progressText.innerText = "Loading Complete!";
    progressContainer.style.opacity = '0';
    // progressContainer.style.pointerEvents = 'none';
    setTimeout(() => { progressContainer.remove(); }, 2350);
};

THREE.DefaultLoadingManager.onError = function(url) {
    console.log('There was an error loading ' + url);
};

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 500);
const controls = new OrbitControls(camera, renderer.domElement);

controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableDamping = true;

const pointlight = new THREE.PointLight(0xffffff, 1);
pointlight.position.set(200, 200, 200);
scene.add(pointlight);

let envmaploader = new THREE.PMREMGenerator(renderer);

window.addEventListener("resize", function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

new RGBELoader().setPath('/').load('cayley_interior_4k.hdr', function(hdrmap) {

    let envmap = envmaploader.fromCubemap(hdrmap);
    let texture = new THREE.CanvasTexture(new FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;

    const ballMaterial = {
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        metalness: 0.9,
        roughness: 0.5,
        color: 0x8418ca,
        normalMap: texture,
        normalScale: new THREE.Vector2(0.15, 0.15),
        envMap: envmap.texture
    };

    let ballGeo = new THREE.SphereGeometry(100, 64, 64);
    let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
    let ballMesh = new THREE.Mesh(ballGeo, ballMat);
    scene.add(ballMesh);

    animate();

});


function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}