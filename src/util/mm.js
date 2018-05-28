/*
* @Author: EchoPlus
* @Date:   2018-05-27 17:38:03
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-27 22:05:17
*/
'use strict';
//引入Hogan
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _mm = {
    //网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type         : param.method  || 'get',
            url          : param.url     || '',
            dateType     : param.type    || 'json',
            date         : param.data    || '',
            success      : function(res){
                //0 状态请求成功
                    if(0 === res.status){
                        typeof param.success == 'function' && param.success(res.data,res.success);
                    }else if(10 == res.status){
                        //需要进行登陆
                        _this.doLogin();
                    }else if(1 == res.status){
                        //请求输入错误
                        typeof param.error == 'function' && param.error(res.msg);
                    }
            },
            //失败的请求！！！
            error        : function(err){
                         typeof param.error == 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    }, 
    //获取 url中的 name的值
    getUrlParam : function(name){
        //匹配正则表达式 获取key/value值
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // 获取？ 之后的值,并匹配reg表达式，用于获取数据
        var result  = window.location.search.substr(1).match(reg);
        //判断result是否为空，如果不为空则返回第二个数据
        return result ? decodeURIComponent(result[2]) : null;
    },
    //使用hogan渲染html模板 
    //可以将data替换成html模板中的数据
    renderHtml : function(htmlTemplate,data){
        //编译html模板
        var template = Hogan.compile(htmlTemplate),
        //根据data进行渲染参数
         result = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功');
    },
    //错误提示
    errorTips : function(msg){
        alert(msg || '有什么地方不对');
    },
    //字段的验证，支持是否为空,支持手机，非空判断，邮箱
    validate : function(value,type){
        //非空验证  将value值强行转换为boolean类型，进行非空判断
        if('require' == type){
            return !! value;
        }
        //手机验证
        if('phone' == type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' == type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //进行登陆处理
    doLogin : function(){
        //跳转到登陆页面！！！ 并带上从那个页面跳转的信息
        window.location.href = './login.html?redirect = ' + encodeURIComponent(window.location.href);
    },
    //统一主跳转
    goHome  : function(){
        window.location.href = './index.html';
    }
};

//输出_mm
module.exports = _mm;