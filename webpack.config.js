/**
 * Created by DaGuo on 2017/3/15.
 */
var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

var DEV = process.env.NODE_ENV == 'development';


var config = {

    // Here the application starts executing(执行)
    // and webpack starts bundling


    entry:{
        app: [ './app/index.js'],
        vendor:[
            'react',
            'react-dom',
            'redux',
            'react-redux',
            "react-router"
        ]
    },
    // entry:[
    //     'babel-polyfill',
    //     './admin/index.js'
    // ],

    // options related to how webpack emits results (一些webpack输出打包结果的参数配置)
    output: {

        // the target directory for all outputs files
        //must be an absolute path (use the Node.js module)
        path: path.resolve(__dirname,  'dist' ), //string

        // the filename template for entry chunks (所有打包代码块的入口文件名)
        filename: 'bundle.[chunkhash].js',
        /*
         filename: "[name].js", // for multiple entry points
         filename: "[chunkhash].js", // for long term caching
         */

        //the url to the output directory resolved relative to the HTML page (输出目录的url解析相对于HTML页面)
        publicPath: '/', //string
        /*
         publicPath: "",
         publicPath: "https://cdn.example.com/",
         */
    },

    module:{
        // configuration regarding modules (关于模块的配置)

        rules:[
            // rules for modules(configure loaders,parser options,etc.)


            // these are matching conditions, each accepting a regular expression or string
            // test and include have the same behavior, both must be matched
            // exclude must not be matched (takes preferrence over test and include)
            // Best practices:
            // - Use RegExp only in test and for filename matching
            // - Use arrays of absolute paths in include and exclude
            // - Try to avoid exclude and prefer include

            {
                test:/\.js|jsx?$/,
                include:[
                    path.resolve(__dirname,"app")
                ],
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ],

                // the loader which should be applied,it'll resolved relative to the context
                // -loader suffix no longer optional in webpack2
                loader:DEV ? ['react-hot-loader','babel-loader'] : 'babel-loader',

                //options for loader
                // options:{
                //     presets:[
                //         "es2015",
                //         "stage-0",
                //         "react"
                //     ]
                // }
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
                    fallback:'style-loader',
                    use:['css-loader']
                })
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader']
                })
            },
            {
                test:/\.json$/,
                use:'json-loader'
            }
        ]
    },

    resolve:{
        //options for resolving module requests (所包含的模块需求的配置)
        //(does not apply to resolving to loaders)

        modules:[
            "node_modules",
            path.resolve(__dirname,"app")
        ],
        extensions: ['.js','.scss', '.css','.jsx','.json']
    },

    devtool:  DEV ? "sourcemap" : false ,//enum

    /*
     devtool: "inline-source-map", // inlines SourceMap into orginal file
     devtool: "eval-source-map", // inlines SourceMap per module
     devtool: "hidden-source-map", // SourceMap without reference in original file
     devtool: "cheap-source-map", // cheap-variant of SourceMap without module mappings
     devtool: "cheap-module-source-map", // cheap-variant of SourceMap with module mappings
     devtool: "eval", // no SourceMap, but named modules. Fastest at the expense of detail.
     // enhance debugging by adding meta info for the browser devtools
     // source-map most detailed at the expense of build speed.
     */



    plugins:[
        new ExtractTextPlugin('style.[chunkhash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename:'vendor.js'
        }),
        new HtmlWebpackPlugin({
            title: 'Blog | React',
            template: './index.html',
            inject: 'body'
        })
    ]

};

if(DEV){
    config.entry.app.unshift(
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server'
    );
    config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('development')
            }
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:3001' })
    ]);


    // config.devServer = {
    //     // proxy: { // proxy URLs to backend development server
    //     //     '/api': 'http://localhost:3000'
    //     // },
    //     contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    //         compress: true, // enable gzip compression
    //         historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    //         hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    //         https: false, // true for self-signed, object for cert authority
    //         noInfo: true, // only errors & warns on hot reload
    //     // ...
    // }
}else{
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('production')
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]);
}

module.exports = config;