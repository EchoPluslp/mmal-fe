/*
* @Author: EchoPlus
* @Date:   2018-05-28 10:38:45
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-28 14:35:38
*/
'use strict';
// _代表自己写的工具类或者通用的东西
var _mm = require('util/mm.js');

var _user = {
     //检查登入状态逻辑！！！
    checkLogin : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //登出逻辑！！！
    logout : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
}

module.exports = _user;