const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js",
    },
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve(__dirname, "../backend/gp/static"),
        publicPath: '/static/',
    },
optimization: {
    minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(),
    ]
},
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css"}),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname,'./src/template_prod.html'), to: path.resolve(__dirname,'../backend/gp/static/index.html') }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //3. Extract css into files
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader" //1. Turns sass into css
                ]
            }
        ]
    }
});