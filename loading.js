import * as THREE from 'three';

const progressContainer = document.querySelector('.progress-container');
const currentText = document.querySelector('.current-text');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');

THREE.DefaultLoadingManager.onStart = () => {
    console.log('Started loading files.');
};

THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    progressBar.value = (itemsLoaded / itemsTotal) * 100;

    currentText.innerText = `Loading asset: ${url} (${itemsLoaded}/${itemsTotal})`;
};

THREE.DefaultLoadingManager.onLoad = () => {
    console.log('Loading Complete!');

    progressText.innerText = 'Loading Complete!';

    progressContainer.style.opacity = '0';
    progressContainer.style.pointerEvents = 'none';
};

THREE.DefaultLoadingManager.onError = (url) => {
    console.log('There was an error loading ' + url);
};
