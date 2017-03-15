var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client');
var APP_DIR = path.resolve(__dirname, 'src/client/js');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'index.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};

module.exports = config;