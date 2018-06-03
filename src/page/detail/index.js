/*
* @Author: EchoPlus
* @Date:   2018-05-31 15:33:18
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-06-03 14:36:31
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm              = require('util/mm.js');
var _product         = require('service/product-service.js');
var _cart         = require('service/cart-service.js'); 
var templateIndex    = require('./index.string');

var page={
    data : {
          productId    :  _mm.getUrlParam('productId')    || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //如果灭有productId自动跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    // 升降序逻辑
    bindEvent : function(){
        var _this = this;
        //图片预览
        $(document).on('mouseenter','.p-img-item',function(){
            var imageUrl     = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl);
        });
        //count，加减号的操作
        $(document).on('click','.p-count-btn',function(){
           var  type     = $(this).hasClass('plus') ? 'plus'  : 'minus',
             $pCount     = $('.p-count'),
             currCount   = parseInt($pCount.val()),
             minCount    = 1,
             maxCount    = _this.data.detailInfo.stock || 1;
            if(type == 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }else if(type == 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
              
            }
        });
        //加入购物车
        $(document).on('click','.cart-add',function(){
            _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val()
            },function(res){
                window.location.href = './result.html?type=cart-add'
            },function(errMsg){
                _mm.errTips(errMsg);
            });
        });
    },
    // 加载商品详情的数据
    loadDetail : function(){
        var    _this    = this;
        var   html      = '';
        var  $pageWrap  =  $('.page-wrap');
        //loading
         $pageWrap.html('<div class="loading"></div>');
         //请求detail信息
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res);
            //缓存res值 
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex,res);
            $pageWrap.html(html);
        },function(errMsg){
            $pageWrap.html('<p class="err-tip">商品被黑洞卷走了......</p>');

        });
    },  
    //filter数据匹配，分割图片路径
    filter : function(data){
        data.subImage = data.subImage.split(',');
    },
};
$(function(){
    page.init();
})