var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var User=require('../models/User.js');

//注册页加载
router.get('/', function(req, res, next) {
  res.render('signup');
});
//注册
//验证用户名,电话是否重复
router.post('/', function(req, res, next) {
    console.log(req.body);
    if(!req.body.pwd){
        User.find(req.body,function(err,docs){
            if(!err&&docs.length>0){
                res.json({code:1,msg:"已存在"});
            }else{
                res.json({code:-1,msg:"输入成功"});
            }
        });
    }else{
        var user=new User({
            name:req.body.name,
            pwd:req.body.pwd,
            tel:req.body.tel
        });
        user.save(function(err){
            if(err){
                res.json({code:-1,msg:"注册失败"});
            }else{
                res.json({code:1,msg:"注册成功"});
            }
        });
    }
});
module.exports = router;