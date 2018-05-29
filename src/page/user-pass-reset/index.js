/*
* @Author: EchoPlus
* @Date:   2018-05-26 17:07:49
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-29 15:44:37
*/
 'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm      = require('util/mm.js');
var _user    = require('service/user-service.js')

//表单的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page逻辑部分
var page = {
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad     : function(){
        this.loadStepUsername();
    },
    bindEvent  : function(){
        var _this = this;
        $('#submit-username').click(function(){
            //输入用户名的下一步的点击事件
            var username = $.trim($('#username').val());
            //判断用户名是否输入
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                    //第一步的调用逻辑
                },function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                formError.show('请输入用户名');
            }
        });

        //输入密码提示问题中的答案下一步的点击
        $('#submit-question').click(function(){
            //输入用户名的下一步的点击事件
            var answer = $.trim($('#answer').val());
            //判断密码提示问题答案是否输入
            if(answer){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                },function(res){
                    _this.data.answer    = answer;
                    _this.data.token     = res;
                    _this.loadStepPassword();
                    //第一步的调用逻辑
                },function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                formError.show('请输入密码提示问题的答案');
            }
        });
        
         //输入新密码后的按钮点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            //判断密码是否输入
            if(password && password.length >= 6){
                //判断密码是否为空
                _user.resetPassword({
                    username        : _this.data.username,
                    forgetToken     : _this.data.token,
                    passwordNew     : password
                },function(res){
                    //密码重置成功，跳转到result页面
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                //密码为空
                formError.show('请输入不少于六位的新密码');
            }
        });
    },
    loadStepUsername : function(){
        $('.step-username').show();
    },
    //这是加载输入密码提示问题答案的步骤
    loadStepQuestion : function(){
        formError.hide(); //清楚错误提示
        //做容器的切换!!!
        $('.step-username').hide()
            .siblings('.step-question').show()
             .find('.question').text(this.data.question);
    },
    //这是加载输入新密码的步骤
    loadStepPassword : function(){
        $('.step-question').hide().siblings('.step-password').show();
    }
};

$(function(){
    page.init();
});