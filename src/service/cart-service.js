/*
* @Author: EchoPlus
* @Date:   2018-05-28 11:26:01
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-06-03 14:36:24
*/
/*
* @Author: EchoPlus
* @Date:   2018-05-28 10:38:45
* @Last Modified by:   EchoPlus
* @Last Modified time: 2018-05-28 11:22:48
*/
'use strict';
// _代表自己写的工具类或者通用的东西
var _mm = require('util/mm.js');

var _cart = {
     
    //获取购物车数量
    getCartCount : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            //默认使用get方式
            success : resolve,
            error : reject
        });
    },
    //添加到购物车
    addToCart    :function(productInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;