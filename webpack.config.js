const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
                // Se corrigió la expresión regular a la estándar para archivos .js
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // ----> ¡AQUÍ ESTÁ LA CORRECCIÓN! <----
                    // Se añade el objeto 'options' para decirle a Babel qué preset usar.
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
        new CopyWebpackPlugin({
            patterns: [{ from: './src/styles/styles.css',
            to: '' }],
        })
    ]
};