const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js', // نقطة البداية
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        // استخدام Babel لتحويل JavaScript
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        },
        // تحميل ملفات SCSS إلى CSS
        {
            test: /\.scss$/,
            use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            ],
        },
        // تحميل ملفات HTML
        {
            test: /\.html$/,
            use: ['html-loader'],
        },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        template: './src/views/index.html', // ربط HTML
        filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
        filename: 'styles.css', // تصدير CSS إلى ملف منفصل
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
        hot: true,
    },
};

