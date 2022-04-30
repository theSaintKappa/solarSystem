const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'en/index.html'),
                main: resolve(__dirname, 'pl/index.html'),
                nested: resolve(__dirname, 'glowingball/index.html')
            }
        }
    }
});