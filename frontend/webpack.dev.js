const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js",
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "../backend/gp/static"),
        // publicPath: 'http://localhost:8000/static/',
        publicPath: '/static/',
    },
    devServer: {
        port: 3000,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'}
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname,'./src/template_dev.html'), to: path.resolve(__dirname,'../backend/gp/static/index.html') }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    }
});
