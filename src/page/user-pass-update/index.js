/*
* @Author: EchoPlus
* @Date:   2018-05-29 15:58:20
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-29 18:07:40
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide           = require('page/common/nav-side/index.js');
var _mm               = require('util/mm.js');
var _user             = require('service/user-service.js');


// page逻辑部分
var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        //学习事件冒泡原理
        //点击编辑按钮后的动作
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password             : $.trim($('#password').val()),
                passwordNew          : $.trim($('#password-new').val()),
                passwordConfirm      : $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户密码
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                },function(res,msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },

    //验证字段信息
    validateForm : function(formData){
//验证用户名和密码不为空
        var result = {
            status : false,
            msg    : '' 
        };

        if(!_mm.validate(formData.password,'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        //或逻辑执行顺序
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码长度不能小于6位';
            return result;
        }
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        //通过验证，返回正确的结果
        result.status  = true;
        result.msg     = '验证通过';
        return result;
    }
};

$(function(){
    page.init();
});
