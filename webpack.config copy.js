// var mode = process.env.NODE_ENV || 'development';

module.exports = {
    // devtool: (mode === 'development') ? 'inline-source-map' : false,
    // mode: mode,
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
      },
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png)$/,
                use: {
                 loader: 'url-loader'
                }
            }
        ]
    }
}

