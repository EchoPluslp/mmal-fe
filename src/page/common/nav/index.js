/*
* @Author: EchoPlus
* @Date:   2018-05-28 09:14:59
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-29 13:36:06
*/
'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');
var _cart   = require('service/cart-service.js'); 
//导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        //return 就是指向了调用者nav
        return this;
    },
    //登录注册
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html'
        });
        //退出登录 点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            //显示当前登录的用户名
            $('.user.not-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
            },function(errMsg){
                //do nothing 错误时，不需要做其他的事情
            });
    },
    //加载购物车数量
    loadCartCount : function(){
          _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
            },function(errMsg){
            //
             $('.nav .cart-count').text(0);
            });
    }
};
//输出当前module
module.exports = nav.init();