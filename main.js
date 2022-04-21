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

// orbit controls & grid
const controls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper(400, 500, 0xff0000, 0x7ea689);


controls.addEventListener('end', function() {
    sessionStorage.setItem('camPosX', camera.position.x);
    sessionStorage.setItem('camPosY', camera.position.y);
    sessionStorage.setItem('camPosZ', camera.position.z);
});
// camera.position.setX(sessionStorage.getItem('camPosX'));
// camera.position.setY(sessionStorage.getItem('camPosY'));
// camera.position.setZ(sessionStorage.getItem('camPosZ'));
camera.position.set(0, 34, 70);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);


const mainPointLight = new THREE.PointLight(0xffffff, 2.3, 0, 2);
mainPointLight.position.set(0, 0, 0)


const mercuryAnker = new THREE.PointLight(0xffffff, 0);
const venusAnker = new THREE.PointLight(0xffffff, 0);
const earthAnker = new THREE.PointLight(0xffffff, 0);
const moonAnker = new THREE.PointLight(0xffffff, 0);

const mercuryAnkerHelper = new THREE.PointLightHelper(mercuryAnker, 0.6, 0xd4b728);
const venusAnkerHelper = new THREE.PointLightHelper(venusAnker, 0.8, 0xad6b07);
const earthAnkerHelper = new THREE.PointLightHelper(earthAnker, 1, 0x0066ff);
const moonAnkerHelper = new THREE.PointLightHelper(moonAnker, 1, 0x948f88);


const mercuryTorusGeometry = new THREE.TorusGeometry(24, 0.1, 10, 100);
const mercuryTorusMaterial = new THREE.MeshBasicMaterial();
const mercuryTorus = new THREE.Mesh(mercuryTorusGeometry, mercuryTorusMaterial);
mercuryTorus.rotation.x = Math.PI / 2;


const venusTorusGeometry = new THREE.TorusGeometry(40, 0.1, 10, 100);
const venusTorusMaterial = new THREE.MeshBasicMaterial();
const venusTorus = new THREE.Mesh(venusTorusGeometry, venusTorusMaterial);
venusTorus.rotation.x = Math.PI / 2;


const earthTorusGeometry = new THREE.TorusGeometry(56, 0.1, 10, 100);
const earthTorusMaterial = new THREE.MeshBasicMaterial();
const earthTorus = new THREE.Mesh(earthTorusGeometry, earthTorusMaterial);
earthTorus.rotation.x = Math.PI / 2;
const moonTorusGeometry = new THREE.TorusGeometry(12, 0.1, 10, 100);
const moonTorusMaterial = new THREE.MeshBasicMaterial();
const moonTorus = new THREE.Mesh(moonTorusGeometry, moonTorusMaterial);
moonTorus.rotation.x = Math.PI / 2;


const marsTorusGeometry = new THREE.TorusGeometry(72, 0.1, 10, 100);
const marsTorusMaterial = new THREE.MeshBasicMaterial();
const marsTorus = new THREE.Mesh(marsTorusGeometry, marsTorusMaterial);
marsTorus.rotation.x = Math.PI / 2;


const jupiterTorusGeometry = new THREE.TorusGeometry(88, 0.1, 10, 100);
const jupiterTorusMaterial = new THREE.MeshBasicMaterial();
const jupiterTorus = new THREE.Mesh(jupiterTorusGeometry, jupiterTorusMaterial);
jupiterTorus.rotation.x = Math.PI / 2;


const saturnTorusGeometry = new THREE.TorusGeometry(104, 0.1, 10, 100);
const saturnTorusMaterial = new THREE.MeshBasicMaterial();
const saturnTorus = new THREE.Mesh(saturnTorusGeometry, saturnTorusMaterial);
saturnTorus.rotation.x = Math.PI / 2;


const uranusTorusGeometry = new THREE.TorusGeometry(120, 0.1, 10, 100);
const uranusTorusMaterial = new THREE.MeshBasicMaterial();
const uranusTorus = new THREE.Mesh(uranusTorusGeometry, uranusTorusMaterial);
uranusTorus.rotation.x = Math.PI / 2;


const neptuneTorusGeometry = new THREE.TorusGeometry(136, 0.1, 10, 100);
const neptuneTorusMaterial = new THREE.MeshBasicMaterial();
const neptuneTorus = new THREE.Mesh(neptuneTorusGeometry, neptuneTorusMaterial);
neptuneTorus.rotation.x = Math.PI / 2;



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


// Mercury
const mercuryTexture = new THREE.TextureLoader().load('/mercury.jpg');
const mercuryBump = new THREE.TextureLoader().load('/mercury-normalmap.jpg');
const mercuryGeometry = new THREE.SphereGeometry(2.5, 128, 128);
const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    normalMap: mercuryBump
});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(24, 0, 0);


// Venus
const venusTexture = new THREE.TextureLoader().load('/venus.jpg');
const venusBump = new THREE.TextureLoader().load('/venus-normalmap.jpg');
const venusGeometry = new THREE.SphereGeometry(3, 128, 128);
const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture,
    normalMap: venusBump
});
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(40, 0, 0)


// Earth
const earthTexture = new THREE.TextureLoader().load('/earth.jpg');
const earthBump = new THREE.TextureLoader().load('/earth-normalmap.jpg');
const earthGeometry = new THREE.SphereGeometry(4, 128, 128);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthBump
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(56, 0, 0)


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


mercuryAnker.add(mercury);

venusAnker.add(venus);

earthAnker.add(earth);
earth.add(moonTorus, moonAnker);

moonAnker.add(moon);


scene.add(
    // sun & lighting
    sun,
    ambientLight,
    mainPointLight,

    // main ankers in the sun
    mercuryAnker,
    venusAnker,
    earthAnker,

    // colorful anker helpers
    earthAnkerHelper,
    moonAnkerHelper,
    mercuryAnkerHelper,
    venusAnkerHelper,

    // all the toruses
    earthTorus,
    mercuryTorus,
    venusTorus,
    marsTorus,
    jupiterTorus,
    saturnTorus,
    uranusTorus,
    neptuneTorus,
);




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


const ambientLightCheckbox = document.querySelector('#checkbox-light-ambient');
const pointLightCheckbox = document.querySelector('#checkbox-light-point');
const gridLightCheckbox = document.querySelector('#checkbox-grid-helper')

function sceneObjControl(controller, obj) {
    controller.addEventListener("change", function() {
        if (this.checked) {
            scene.add(obj);
        } else {
            scene.remove(obj);
        }
    });
}

sceneObjControl(ambientLightCheckbox, ambientLight);
sceneObjControl(pointLightCheckbox, mainPointLight);
sceneObjControl(gridLightCheckbox, gridHelper);


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


    renderer.render(scene, camera);


    const checkbox = document.querySelector('#checkbox');
    if (!(checkbox.checked)) return;


    mercuryAnker.rotation.y += 0.0065;

    venusAnker.rotation.y += 0.00375;

    earthAnker.rotation.y += 0.002;
    moonAnker.rotation.y += 0.01;

    moon.rotation.y -= 0.01;
    earth.rotation.y -= 0.002;
};

function addStar() {
    const geometry = new THREE.SphereGeometry(0.4, 24, 24);
    const material = new THREE.MeshBasicMaterial();
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) * 5)
        // console.log("star: " + x, y, z)

    star.position.set(x, y, z)
    scene.add(star)
}

Array(1500).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('/space2.jpg');
scene.background = spaceTexture;



animate();