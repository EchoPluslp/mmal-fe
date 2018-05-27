/*
* @Author: EchoPlus
* @Date:   2018-05-26 16:10:43
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-27 15:47:04
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置 dev  和/online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev'; //该变量区分是线上还是开发环境
console.log(WEBPACK_ENV);

var packPluginConfig  = function(name){
           return{
            template : './src/view/'+  name +'.html',
            filename : 'view/'+  name +'.html',
            inject   : true,
            hash     : true,  
            chunks  : ['common',name]
            };  
};
//webpack config
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index'  : ['./src/page/index/index.js'],
        'login'  : ['./src/page/login/index.js'],
    },
    output : {
        path:'./dist',
        publicPath : '/dist',
        filename:'/js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    //设置生成css文件
     module : {
        loaders : [
         { 
            test  : /\.css$/,
            loader : ExtractTextPlugin.extract('style-loader','css-loader')
             //"style-loader!css-loader"
         },
     { 
            test  : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
            loader : 'url-loader?limit=100&name=resource/[name].[ext] ' },
     ]
  },
    plugins:[
        //独立通用模块打包到base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : '/js/base.js'
        }),
        //将css文件单独打包
        new ExtractTextPlugin("/css/[name].css"),
        //对html模块的处理
        new HtmlWebpackPlugin(packPluginConfig('index')),
        new HtmlWebpackPlugin(packPluginConfig('login'))
    ]
};

//如果是开发环境，就会设置client文件
if('dev' == WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
