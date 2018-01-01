const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env) => {
    const srcPath = path.join(__dirname, 'src');
    const plugins = [];
    let devtool = '';
    let distPath = '';
    let entry = {};
    let tsExclude = ['dist', /node_modules/];
    let tsCompilerOptions = {

    };
    let uglifyJsOptions = {
        test: /\.js$/i,
        include: undefined,
        exclude: undefined,
        cache: false,
        parallel: false,
        sourceMap: false,
        // uglifyOptions: {},
        extractComments: false,
        warningsFilter: () => true,
    };
    let copyWebpackPluginOptions = [];

    // if (env === 'demo') {
    //     devtool = 'source-map';
    //     distPath = path.resolve(__dirname, 'demo');
    //     entry.demo = 'demo/demo.ts';
    //     uglifyJsOptions.sourceMap = true;
    //     copyWebpackPluginOptions.push({ from: 'demo/index.html' });
    // } else {
    devtool = '';
    distPath = path.join(__dirname, 'dist');
    entry.flutter = 'flutter.ts';
    tsExclude.unshift('demo');
    // }

    plugins.push(new UglifyJsPlugin(uglifyJsOptions));
    plugins.push(new CopyWebpackPlugin(copyWebpackPluginOptions));

    return {
        devtool: devtool,
        context: srcPath,
        entry: entry,
        output: {
            path: distPath,
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.html', '.png', '.jpg', '.gif'],
            modules: ['src', 'dist', 'node_modules']
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
        plugins: plugins
    };
}
