var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Product=require('../models/Product.js');
router.get('/', function(req, res, next) {
    res.render('product');
});
//分页
router.post('/',function(req,res,next){
    var page=parseInt(req.body.page);//req.body.page得到页数
    var rows=parseInt(req.body.rows);//req.body.rows得到数目
    var query=Product.find({});
    query.skip((page-1)*rows).limit(rows).exec(function(err,docs){
        if(err){
            res.send("没有数据");
        }else{
            res.json(docs);
        };
    })

});
module.exports = router;