import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log('Started loading file.');
    // document.querySelector('body').style.display = 'none';
};

THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

THREE.DefaultLoadingManager.onLoad = function() {
    console.log('Loading Complete!');
    // document.querySelector('#canvas').style.opacity = 1;
    // document.querySelector('body').style.display = 'block';
    document.querySelector('#loader').style.opacity = 0;
};

THREE.DefaultLoadingManager.onError = function(url) {
    console.log('There was an error loading ' + url);
};


window.addEventListener("resize", onWindowResize, false);


// scene, camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// renderer
const renderer = new THREE.WebGLRenderer({
    // setting the canvas
    canvas: document.querySelector('#canvas'),
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);

// full screen
renderer.setSize(window.innerWidth, window.innerHeight);

// cam position
camera.position.set(0, 27, 52);



// orbit controls & grid
const controls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 50);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)


const mainPointLight = new THREE.PointLight(0xffffff, 2.3, 0, 2);
mainPointLight.position.set(0, 0, 0)


const sunPointLight = new THREE.PointLight(0xffffff, 0, 0, 2);
const earthPointLight = new THREE.PointLight(0xffffff, 0);
const lightHelper = new THREE.PointLightHelper(sunPointLight)
const lightHelper2 = new THREE.PointLightHelper(earthPointLight)


const earthTorusGeometry = new THREE.TorusGeometry(32, 0.1, 10, 100);
const earthTorusMaterial = new THREE.MeshBasicMaterial();
const earthTorus = new THREE.Mesh(earthTorusGeometry, earthTorusMaterial);
earthTorus.rotation.x = Math.PI / 2;


const moonTorusGeometry = new THREE.TorusGeometry(12, 0.1, 10, 100);
const moonTorusMaterial = new THREE.MeshBasicMaterial();
const moonTorus = new THREE.Mesh(moonTorusGeometry, moonTorusMaterial);
moonTorus.rotation.x = Math.PI / 2;



// Sun
const sunTexture = new THREE.TextureLoader().load('/sun.jpg');
// const sunBump = new THREE.TextureLoader().load('earth-normalmap.jpg');
const sunGeometry = new THREE.SphereGeometry(8, 64, 32)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    // normalMap: sunBump
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.position.set(0, 0, 0)


// Earth
const earthTexture = new THREE.TextureLoader().load('/earth.jpg');
const earthBump = new THREE.TextureLoader().load('/earth-normalmap.jpg');
const earthGeometry = new THREE.SphereGeometry(4, 128, 128);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthBump
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(32, 0, 0)


// Moon
const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
const moonBump = new THREE.TextureLoader().load('/moon-normalmap.jpg');
const moonGeometry = new THREE.SphereGeometry(1.5, 128, 128);
const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonBump
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(12, 0, 0)



sunPointLight.add(earth)
earthPointLight.add(moon)
earth.add(moonTorus, earthPointLight)



// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

// const dir = new THREE.Vector3(2, 2, 0).normalize();

// const origin = new THREE.Vector3(0, 0, 0);
// const length = 1;
// const hex = 0xffff00;

// const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
// scene.add(arrowHelper);

// const sphere = new THREE.SphereGeometry();
// const object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
// const box = new THREE.BoxHelper(object, 0xffff00);
// scene.add(box);

// const plane = new THREE.Plane(new THREE.Vector3(1, 1, 0.2), 3);
// const helper = new THREE.PlaneHelper(plane, 1, 0xffff00);
// scene.add(helper);



scene.add(
    // gridHelper,
    ambientLight,
    sunPointLight,
    lightHelper,
    lightHelper2,
    sun,
    earthTorus,
    mainPointLight,
    // earth,
    // moon,
)

const ambientLightCheckbox = document.querySelector('#checkbox-light-ambient')
const pointLightCheckbox = document.querySelector('#checkbox-light-point')
ambientLightCheckbox.addEventListener("change", function() {
    if (this.checked) {
        scene.add(ambientLight);
    } else {
        scene.remove(ambientLight);
    }
});
pointLightCheckbox.addEventListener("change", function() {
    if (this.checked) {
        scene.add(mainPointLight);
    } else {
        scene.remove(mainPointLight);
    }
});

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    // sun.rotation.y += 0.002;
    // sun.rotation.y -= 0.002;

    // console.log(camera.position)

    renderer.render(scene, camera);


    const checkbox = document.querySelector('#checkbox');
    if (checkbox.checked != true) return;


    earthPointLight.rotation.y += 0.01;
    moon.rotation.y -= 0.01;
    sunPointLight.rotation.y += 0.002;
    earth.rotation.y -= 0.002;
};

function addStar() {
    const geometry = new THREE.SphereGeometry(0.4, 24, 24);
    const material = new THREE.MeshStandardMaterial();
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) * 5)
        // console.log("star: " + x, y, z)

    star.position.set(x, y, z)
    scene.add(star)
}

Array(1000).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('/space2.jpg');
scene.background = spaceTexture;



animate();