/*
* @Author: EchoPlus
* @Date:   2018-05-29 15:58:20
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-29 16:32:59
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user             = require('service/user-service.js');

var templateIndex   = require('./index.string')

// page逻辑部分
var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-Center'
        });
      this.loadUserInfo();
    },

    //加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};

$(function(){
    page.init();
});
