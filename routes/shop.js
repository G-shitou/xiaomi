var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Product=require('../models/Product.js');
router.get('/', function(req, res, next) {
    res.render('shop');
});
//获取cookie中的商品
router.post('/',function(req,res,next){
    //将id获取到，添加到数组keys里面
    var keys=[];
    for(var key in req.body){
        var obj={id:parseInt(key)};
        keys.push(obj);
    }
    //console.log(keys);[{id:1},{id:2},{id:3},{id:4}]
    Product.find({$or:keys},function(err,docs){
        if(err){
            res.send("没有数据");
        }else{
            res.json(docs);
        }
    });
});
module.exports = router;