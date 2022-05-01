import * as THREE from 'three';

THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log('Started loading file.');
};

const progressContainer = document.querySelector('.progress-container');
const currentText = document.querySelector('.current-text');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');

THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    progressBar.value = (itemsLoaded / itemsTotal) * 100;

    currentText.innerText = `ローディング中： ${url} (${itemsLoaded}/${itemsTotal})`;
};

THREE.DefaultLoadingManager.onLoad = function() {
    console.log('よみこみ かんりょう！ ');
    progressText.innerText = "よみこみ かんりょう！ ";
    progressContainer.style.opacity = '0';
    // progressContainer.style.pointerEvents = 'none';
    setTimeout(() => { progressContainer.remove(); }, 2350);
};

THREE.DefaultLoadingManager.onError = function(url) {
    console.log('There was an error loading ' + url);
};