const path = require('path');
const terserplugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'none',
    entry: {
        "rocket3-js-sdk": path.resolve(__dirname, './src/index.js'),
        "rocket3-js-sdk.min": path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Rocket3JsSdk',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        //libraryExport:"default"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new terserplugin({
                test: /\.min\.js$/,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
