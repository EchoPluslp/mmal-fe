/*
* @Author: EchoPlus
* @Date:   2018-05-28 09:14:59
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-28 16:09:28
*/
'use strict';
require('./index.css');
var _mm               = require('util/mm.js');
var templateIndex     = require('./index.string');

//侧边导航
var navSide = {
    option : {
        name    : '',
        navList : [
            {name : 'user-center' , desc : '个人中心' ,   href : './user-center.html'},
            {name : 'order-list' , desc : '我的订单' ,    href : './order-list.html'},
            {name : 'pass-update' , desc : '修改密码' ,   href : './pass-update.html'},
            {name : 'about' , desc : '关于mmall' ,        href : './about.html'}
        ] 
    },
    init : function(option){
        //合并选项
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav : function(){
        //计算active数据 将length进行缓存
        for(var i = 0 , iLength = this.option.navList.length;i < iLength;i++  ){
            if(this.option.navList[i].name === this.option.name){
                //如果当前选中的name，于list页面中的name相等，则添加avtive
                this.option.navList[i].isActive = true;
            }
        };
        //渲染list数据
        var navHtml = _mm.renderHtml(templateIndex,{
            //通过hogan循环渲染数据
            navList : this.option.navList
        });
        //将 navHtml 放入容器
        $('.nav-side').html(navHtml);
    }
};
//输出当前module
module.exports = navSide;