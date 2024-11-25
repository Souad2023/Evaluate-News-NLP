const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');  
const webpack = require('webpack');  

module.exports = {
    mode: 'production',  
    entry: './src/client/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.[contenthash].js',
    },
    resolve: {
        fallback: {
            "url": require.resolve("url/"),
            "util": require.resolve("util/"),
            "zlib": require.resolve("browserify-zlib"),
            "path": require.resolve("path-browserify"),
            "process": require.resolve("process/browser"),
            "stream": require.resolve("stream-browserify"),
            "worker_threads": false,  
            "async_hooks": false,     
            "net": false,  
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),  
    ],
    stats: {
        errorDetails: true,
    },
};
