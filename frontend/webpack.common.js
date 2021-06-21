const BundleTracker  = require('webpack-bundle-tracker');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    plugins: [
            new CleanWebpackPlugin({
                    cleanOnceBeforeBuildPatterns: ['**/*','!favicon.png']
                }),
            new BundleTracker({filename: './webpack-stats.json'}),
            new WriteFilePlugin()
        ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(svg|jpg|jpeg|png|gif)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    }
}

