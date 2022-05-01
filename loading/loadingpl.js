import * as THREE from 'three';

THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log('Rozpoczęto ładowanie plików.');
};

const progressContainer = document.querySelector('.progress-container');
const currentText = document.querySelector('.current-text');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');

THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log('Ładowanie pliku: ' + url + '.\nZaładowano ' + itemsLoaded + ' z ' + itemsTotal + ' plików.');

    progressBar.value = (itemsLoaded / itemsTotal) * 100;

    currentText.innerText = `Ładowanie assetów: ${url} (${itemsLoaded}/${itemsTotal})`;
};

THREE.DefaultLoadingManager.onLoad = function() {
    console.log('Ładowanie zakończone!');
    progressText.innerText = "Ładowanie zakończone!";
    progressContainer.style.opacity = '0';
    // progressContainer.style.pointerEvents = 'none';
    setTimeout(() => { progressContainer.remove(); }, 2350);
};

THREE.DefaultLoadingManager.onError = function(url) {
    console.log('Wystąpił problem ładując ' + url);
};