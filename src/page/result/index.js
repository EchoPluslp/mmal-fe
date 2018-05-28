/*
* @Author: EchoPlus
* @Date:   2018-05-28 16:27:18
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-28 16:49:01
*/
'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

//通过获取type，拼接html页面中的result-con属性,设置那个属性显示
$(function(){
   var type = _mm.getUrlParam('type') || 'default',
   //使用jquery对象
        $element = $('.' + type + '-success');
        //显示对应的提示元素
    $element.show;
    
})