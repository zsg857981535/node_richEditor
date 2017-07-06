/**
 * Created by DaGuo on 2017/3/16.
 */

var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require("webpack-chunk-hash");

var config = {

    entry:{
        app:'./app/index.js',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            "react-router-dom"
        ]
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[chunkhash:6].js',
        chunkFilename: "[name].[chunkhash:6].js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js|jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader',
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'images/[name].[ext]'
                    }
                }]
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2|otf|ico)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            //for antd less loader
            // 解析 less 文件，并加入变量覆盖配置
            {
                test: /\.less$/,
                use: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            modifyVars: {"@blue-6": "#2f3238"},//在这里修改antd 变量
                        },
                    },
                ],
            },
            //less loader end
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        extensions: ['.js', '.scss', '.css', '.jsx', '.json']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            //note:没有用,还是有重复的引用
            names: ["app","vendor","manifest"], // vendor libs + extracted manifest
        }),
        new ExtractTextPlugin('[name].[chunkhash:6].css'),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new webpack.LoaderOptionsPlugin({//所有loader应用的配置
            minimize: true,
            debug: false,
        }),
        new HtmlWebpackPlugin({
            title: 'Blog | React',
            template: './index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest",
            inlineManifest: true
        })
    ]
}

module.exports = config
