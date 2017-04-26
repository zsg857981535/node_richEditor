/**
 * Created by DaGuo on 2017/4/26.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.view');
var port = 3002;


new WebpackDevServer(webpack(config),{
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    compress: true,
    stats: {
        colors: true,
        hash: true,
        timings: true,
        chunks: false
    }
}).listen(port,'localhost',function(err){
    if(err){
        console.log(err);
    }
    console.log('Webpack dev server is listening at localhost:',port);
});