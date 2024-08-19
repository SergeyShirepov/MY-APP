const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js/index.js');
const nodemon = require('nodemon');
const path = require('path');
const { watch } = require('fs');

const compiler = webpack(webpackConfig);

compiler.run((err) => {
    if (err) {
        console.log('Compilation failed: ', err);
    }

compiler.watch({}, (err) =>{
    if (err) {
        console.log('Compilation failed: ', err);
    }
    console.log('Compilation was successfully');
})

nodemon({
    script: path.resolve(__dirname, '../sc/server/server.js'),
    watch: [
        path.resolve(__dirname, '../dist/server'),
        path.resolve(__dirname, '../dist/client'),
    ]
})
});