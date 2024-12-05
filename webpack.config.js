const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');  
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: 'production',
    entry: './src/client/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.[contenthash].js',
    },
    externals: {
        express: 'commonjs express',
    },
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
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,  
            maxSize: 250000, 
        },
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 5050,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"], 
                    },
                },
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
        new BundleAnalyzerPlugin(),
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    ignoreWarnings: [
        {
            module: /express/,
            message: /Critical dependency: the request of a dependency is an expression/,
        },
    ],
    stats: {
        errorDetails: true,
    },
};
