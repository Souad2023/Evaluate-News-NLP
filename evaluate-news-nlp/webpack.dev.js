const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');  

module.exports = {
    mode: 'development',
    entry: './src/client/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.[contenthash].js',
    },
    devServer: {
        static: './dist',
        port: 5050,
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
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "process": require.resolve("process/browser"),
            "stream": require.resolve("stream-browserify"),
            "url": require.resolve("url/"),
            "util": require.resolve("util/"),
            "zlib": require.resolve("browserify-zlib"),
            "worker_threads": false, 
            "async_hooks": false,     
            "net": false,  
        },
    },
    stats: {
        errorDetails: true,
    },
};
