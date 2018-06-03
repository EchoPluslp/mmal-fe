/*
* @Author: EchoPlus
* @Date:   2018-05-26 16:04:21
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-30 10:04:09
*/
 'use strict';
require('page/common/nav/index.js');
require('./index.css');
require('util/slider/indx.js');

require('page/common/header/index.js');
var navSide          = require('page/common/nav-side/index.js');
var templateBanner   = require('./banner.string');

var _mm = require('util/mm.js');

$(function() {
    //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider    = $('.banner').unslider({
        dots : true
    });
    //前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
            $slider.data('unslider')[forward]();
    });

});
