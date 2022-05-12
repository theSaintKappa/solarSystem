const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                pl: resolve(__dirname, 'pl/index.html'),
                jp: resolve(__dirname, 'jp/index.html'),
                error: resolve(__dirname, '404/index.html'),
                license: resolve(__dirname, 'LICENSE/index.html')
            }
        }
    }
});