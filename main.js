//main.js
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Firefox support 😎
if (navigator.userAgent.match(/firefox|fxios/i)) {
    document.body.innerHTML = '';
    document.body.style.minHeight = "100vh";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
    document.body.style.flexDirection = "column";
    document.body.innerHTML = '<iframe id="reddit-embed" src="https://www.redditmedia.com/r/ProgrammerHumor/comments/r6ay5j/relationshipstatus_complicated/?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" scrolling="no" width="640" height="420"></iframe>';
    document.body.appendChild(document.createElement("h1"));
    document.querySelector('h1').innerHTML = "I will add firefox support soon&trade;";
    document.querySelector('h1').style.color = "white";
    document.querySelector('h1').style.marginTop = "35px";
    throw new Error("I hate firefox");
};


window.addEventListener("resize", function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);


// scene, camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);


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
// controls.minDistance = 15;
controls.maxDistance = 2000;
controls.panSpeed = 1.1;
controls.rotateSpeed = 0.9;
controls.autoRotateSpeed = 0.75;

camera.position.set(0, 40, 85);
controls.target.set(1, 1, 1);

document.querySelector('#checkbox-auto-rotate').addEventListener('change', function() {
    if (this.checked) {
        controls.autoRotate = true;
        controls.target.set(0, 0, 0);
    } else {
        controls.autoRotate = false;
    }
});

controls.enableDamping = true;
document.querySelector('#checkbox-camera-damping').addEventListener('change', function() {
    if (this.checked) {
        controls.enableDamping = true;
    } else {
        controls.enableDamping = false;
    }
})


controls.addEventListener('end', function() {
    sessionStorage.setItem('camPosX', camera.position.x);
    sessionStorage.setItem('camPosY', camera.position.y);
    sessionStorage.setItem('camPosZ', camera.position.z);
});


// ft - posX
// bk - negX
// up - posY
// dn - negY
// rt - posZ
// lf - negZ

function changeSkybox(skyboxName) {
    scene.background = new THREE.CubeTextureLoader()
        .setPath(`/skyboxes/skybox${skyboxName}/`)
        .load([
            'ft.png',
            'bk.png',
            'up.png',
            'dn.png',
            'rt.png',
            'lf.png'
        ]);
};
changeSkybox(1);


document.querySelector('#skybox-select').addEventListener("change", function() {
    // changeSkybox(this.value);
    console.error(this.value);

    if ((this.value) != "none") {
        changeSkybox(this.value);
    } else {
        scene.background = null;
    }
});



const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
ambientLight.position.set(0, 0, 0);

const mainPointLight = new THREE.PointLight(0xffffff, 2.1, 0, 2);
mainPointLight.position.set(0, 0, 0);



const arrowDir = new THREE.Vector3(1, 0, 0).normalize();
const arrowOrigin = new THREE.Vector3(0, 0, 0);


const mercuryAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0xff0000); //red
const venusAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0xff8c00); //orange
const earthAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0xffff00); //yellow
const moonAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0xffffff); //moon white
const marsAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0x00ff00); //green
const jupiterAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0x0000ff); //light blue
const saturnAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0x1100ff); //dark blue
const uranusAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0xf700ff); //pink
const neptuneAnker = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1, 0x9000ff); //purple



const mercuryTorusGeometry = new THREE.TorusGeometry(24, 0.1, 10, 150);
const mercuryTorusMaterial = new THREE.MeshBasicMaterial();
const mercuryTorus = new THREE.Mesh(mercuryTorusGeometry, mercuryTorusMaterial);
mercuryTorus.rotation.x = Math.PI / 2;

const venusTorusGeometry = new THREE.TorusGeometry(40, 0.1, 10, 150);
const venusTorusMaterial = new THREE.MeshBasicMaterial();
const venusTorus = new THREE.Mesh(venusTorusGeometry, venusTorusMaterial);
venusTorus.rotation.x = Math.PI / 2;

const earthTorusGeometry = new THREE.TorusGeometry(56, 0.1, 10, 200);
const earthTorusMaterial = new THREE.MeshBasicMaterial();
const earthTorus = new THREE.Mesh(earthTorusGeometry, earthTorusMaterial);
earthTorus.rotation.x = Math.PI / 2;
const moonTorusGeometry = new THREE.TorusGeometry(9, 0.1, 10, 100);
const moonTorusMaterial = new THREE.MeshBasicMaterial();
const moonTorus = new THREE.Mesh(moonTorusGeometry, moonTorusMaterial);
moonTorus.rotation.x = Math.PI / 2;

const marsTorusGeometry = new THREE.TorusGeometry(72, 0.1, 10, 200);
const marsTorusMaterial = new THREE.MeshBasicMaterial();
const marsTorus = new THREE.Mesh(marsTorusGeometry, marsTorusMaterial);
marsTorus.rotation.x = Math.PI / 2;

const jupiterTorusGeometry = new THREE.TorusGeometry(88, 0.1, 10, 200);
const jupiterTorusMaterial = new THREE.MeshBasicMaterial();
const jupiterTorus = new THREE.Mesh(jupiterTorusGeometry, jupiterTorusMaterial);
jupiterTorus.rotation.x = Math.PI / 2;

const saturnTorusGeometry = new THREE.TorusGeometry(104, 0.1, 10, 200);
const saturnTorusMaterial = new THREE.MeshBasicMaterial();
const saturnTorus = new THREE.Mesh(saturnTorusGeometry, saturnTorusMaterial);
saturnTorus.rotation.x = Math.PI / 2;

const uranusTorusGeometry = new THREE.TorusGeometry(120, 0.1, 10, 250);
const uranusTorusMaterial = new THREE.MeshBasicMaterial();
const uranusTorus = new THREE.Mesh(uranusTorusGeometry, uranusTorusMaterial);
uranusTorus.rotation.x = Math.PI / 2;

const neptuneTorusGeometry = new THREE.TorusGeometry(136, 0.1, 10, 250);
const neptuneTorusMaterial = new THREE.MeshBasicMaterial();
const neptuneTorus = new THREE.Mesh(neptuneTorusGeometry, neptuneTorusMaterial);
neptuneTorus.rotation.x = Math.PI / 2;


// Sun
const sunTexture = new THREE.TextureLoader().load('/textures/sun.jpg');
// const sunBump = new THREE.TextureLoader().load('earth-normalmap.jpg');
const sunGeometry = new THREE.SphereGeometry(8, 64, 32)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    // normalMap: sunBump
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.position.set(0, 0, 0)


// Mercury
const mercuryTexture = new THREE.TextureLoader().load('/textures/mercury.jpg');
const mercuryBump = new THREE.TextureLoader().load('/textures/mercury-normalmap.jpg');
const mercuryGeometry = new THREE.SphereGeometry(2.5, 128, 128);
const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    // normalMap: mercuryBump
});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(0, 24, 0);
mercury.rotateZ(Math.PI / 2)


// Venus
const venusTexture = new THREE.TextureLoader().load('/textures/venus.jpg');
const venusBump = new THREE.TextureLoader().load('/textures/venus-normalmap.jpg');
const venusGeometry = new THREE.SphereGeometry(3, 128, 128);
const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture,
    // normalMap: venusBump
});
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(0, 40, 0);
venus.rotateZ(Math.PI / 2)


// Earth
const earthTexture = new THREE.TextureLoader().load('/textures/earth.jpg');
const earthBump = new THREE.TextureLoader().load('/textures/earth-normalmap.jpg');
const earthGeometry = new THREE.SphereGeometry(4, 128, 128);
// const earthMaterial = new THREE.MeshStandardMaterial({
//     map: earthTexture,
//     // normalMap: earthBump
// });
const earthMaterial = new THREE.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
    map: earthTexture,
    specularMap: new THREE.TextureLoader().load('/textures/earth-specular.jpg'),
    // normalMap: earthBump,
    // normalScale: new THREE.Vector2(0.85, 0.85)
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(0, 56, 0);
earth.rotateZ(Math.PI / 2)


// Moon
const moonTexture = new THREE.TextureLoader().load('/textures/moon.jpg');
const moonBump = new THREE.TextureLoader().load('/textures/moon-normalmap.jpg');
const moonGeometry = new THREE.SphereGeometry(1.5, 128, 128);
const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    // normalMap: moonBump
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0, 9, 0);
moon.rotateZ(Math.PI / 2);


// Mars
const marsTexture = new THREE.TextureLoader().load('/textures/mars.jpg');
const marsBump = new THREE.TextureLoader().load('/textures/venus-normalmap.jpg');
const marsGeometry = new THREE.SphereGeometry(3, 128, 128);
const marsMaterial = new THREE.MeshStandardMaterial({
    map: marsTexture,
    // normalMap: marsBump
});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(0, 72, 0);
mars.rotateZ(Math.PI / 2);


// Jupiter
const jupiterTexture = new THREE.TextureLoader().load('/textures/jupiter.jpg');
const jupiterBump = new THREE.TextureLoader().load('/textures/venus-normalmap.jpg');
const jupiterGeometry = new THREE.SphereGeometry(6, 128, 128);
const jupiterMaterial = new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    // normalMap: jupiterBump
});
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.set(0, 88, 0);
jupiter.rotateZ(Math.PI / 2);


// Saturn
const saturnTexture = new THREE.TextureLoader().load('/textures/saturn.jpg');
const saturnBump = new THREE.TextureLoader().load('/textures/venus-normalmap.jpg');
const saturnGeometry = new THREE.SphereGeometry(5, 128, 128);
const saturnMaterial = new THREE.MeshStandardMaterial({
    map: saturnTexture,
    // normalMap: saturnBump
});
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(0, 104, 0);
saturn.rotateZ(Math.PI / 2 + 0.3);
saturn.rotateX(0.1);


const saturnRingTexture = new THREE.TextureLoader().load('/textures/saturn-ring.jpg');
const saturnRingGeometry = new THREE.RingGeometry(9.5, 6.5, 32);
const saturnRingMaterial = new THREE.MeshStandardMaterial({
    map: saturnRingTexture,
    transparent: false,
    alphaMap: new THREE.TextureLoader().load('/textures/saturn-ring-alpha.gif')
});
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturn.add(saturnRing);
saturnRing.rotateX(Math.PI / 2);






// Uranus
const uranusTexture = new THREE.TextureLoader().load('/textures/uranus.jpg');
const uranusBump = new THREE.TextureLoader().load('/textures/venus-normalmap.jpg');
const uranusGeometry = new THREE.SphereGeometry(3.5, 128, 128);
const uranusMaterial = new THREE.MeshStandardMaterial({
    map: uranusTexture,
    // normalMap: uranusBump
});
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.set(0, 120, 0);
uranus.rotateZ(Math.PI / 2);


// Neptune
const neptuneTexture = new THREE.TextureLoader().load('/textures/neptune.jpg');
const neptuneBump = new THREE.TextureLoader().load('/textures/venus-normalmap.jpg');
const neptuneGeometry = new THREE.SphereGeometry(3.5, 128, 128);
const neptuneMaterial = new THREE.MeshStandardMaterial({
    map: neptuneTexture,
    // normalMap: neptuneBump
});
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.set(0, 136, 0);
neptune.rotateZ(Math.PI / 2);


mercuryAnker.add(mercury);

venusAnker.add(venus);

earthAnker.add(earth);
earth.add(moonTorus, moonAnker);
moonAnker.add(moon);

marsAnker.add(mars);

jupiterAnker.add(jupiter);

saturnAnker.add(saturn);

uranusAnker.add(uranus);

neptuneAnker.add(neptune);



scene.add(
    // sun & lighting
    sun,
    ambientLight,
    mainPointLight,

    // main ankers in the sun
    mercuryAnker,
    venusAnker,
    earthAnker,
    marsAnker,
    jupiterAnker,
    saturnAnker,
    uranusAnker,
    neptuneAnker,


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
// axesHelper.position.setY(15)

// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);


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
};

sceneObjControl(ambientLightCheckbox, ambientLight);
sceneObjControl(pointLightCheckbox, mainPointLight);
sceneObjControl(gridLightCheckbox, gridHelper);



const planets = ["mercury", "venus", "earth", "moon", "mars", "jupiter", "saturn", "uranus", "neptune"];

planets.forEach(planet => planetHover(planet));

function planetHover(planet) {
    const torusMat = eval(planet + "TorusMaterial");
    // Dear future me
    // Please forgive me
    // I can't express how sorry I am
    const elementId = document.querySelector(`#${planet}`);

    elementId.addEventListener("mouseover", function() {
        torusMat.color.setHex(0x99ff00);
    });
    elementId.addEventListener("mouseout", function() {
        torusMat.color.setHex(0xffffff);
    });
}




let orbitalSpeed = 8000;
// lower number = planets faster
// higher number = planets slower

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    // sun.rotation.y += 0.002;
    // sun.rotation.y -= 0.002;


    renderer.render(scene, camera);


    const checkbox = document.querySelector('#checkbox');
    if (!(checkbox.checked)) return;


    mercuryAnker.rotation.y += 47.9 / orbitalSpeed;

    venusAnker.rotation.y += 35 / orbitalSpeed;

    earthAnker.rotation.y += 29.8 / orbitalSpeed;
    moonAnker.rotation.y += 61.3833 / orbitalSpeed;

    marsAnker.rotation.y += 24.1 / orbitalSpeed;

    jupiterAnker.rotation.y += 13.1 / orbitalSpeed;

    saturnAnker.rotation.y += 9.7 / orbitalSpeed;

    uranusAnker.rotation.y += 6.8 / orbitalSpeed;

    neptuneAnker.rotation.y += 5.4 / orbitalSpeed;
};

function addStar() {
    const geometry = new THREE.SphereGeometry(2, 4, 4);
    // const material = new THREE.MeshNormalMaterial(); //kolorki
    const material = new THREE.MeshBasicMaterial(); //nie potrzebuje oświetlenia
    // const material = new THREE.MeshStandardMaterial(); //potrzebuje oświetlenie
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(10000))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(7500).fill().forEach(addStar)

animate();