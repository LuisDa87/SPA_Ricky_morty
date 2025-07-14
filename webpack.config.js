const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // Ya no lo necesitamos

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html',
            }
        ),
        /*
        // Eliminamos este plugin porque ya no tenemos un archivo CSS separado
        new CopyWebpackPlugin({
            patterns: [{ from: './src/styles/styles.css',
            to: '' }],
        })
        */
    ]
};
