var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Product=require('../models/Product.js');
router.get('/', function(req, res, next) {
    res.render('detail');
});
//获取指定的商品详情页
router.post('/',function(req,res,next){
    Product.find(req.body,function(err,docs){
        if(err){
            res.send("没有数据");
        }else{
            res.json(docs);
        }
    });
});
module.exports = router;