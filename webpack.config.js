const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const distPath = path.join(__dirname, 'distDemo');
const tsExclude = ['dist', 'distDemo', /node_modules/];
const tsCompilerOptions = {
    outDir: 'distDemo',
};

module.exports = {
    devtool: 'source-map',
    context: path.join(__dirname, 'demo'),
    entry: 'demo.ts',
    output: {
        path: distPath,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.html', '.png', '.jpg', '.gif'],
        modules: ['demo', 'dist', 'node_modules']
    },
    devServer: {
        contentBase: distPath,
        compress: false,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: tsExclude,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: tsCompilerOptions
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [new CopyWebpackPlugin([{ from: 'index.html' }])]
};
