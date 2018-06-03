/*
* @Author: EchoPlus
* @Date:   2018-05-28 14:39:50
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-30 10:13:19
*/
'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
//通用页面头部！！！
var header = {
    init : function(){
        this.bindEvent();
        this.onload();
    },
    onload : function(){
        //搜索后的信息回填
        var keyword = _mm.getUrlParam('keyword');
        //如果keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮以后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交 按下键盘，放手的时候
        $('#search-input').keyup(function(e){
            //触发后，回调事件   13是回车键
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交方法
    searchSubmit : function(){
        //获取keyword
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            //如果有keyword。就跳转到list页面，并提交keyword
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            //如果没有keyword则跳转到主页
            _mm.goHome();
        }
    }
};

header.init();