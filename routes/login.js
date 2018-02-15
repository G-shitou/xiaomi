var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var User=require('../models/User.js');

//登录页加载
router.get('/', function(req, res, next) {
  res.render('login');
});
//登录
router.post('/', function(req, res, next) {
    console.log(req.body);
    User.find(req.body,function(err,docs){
        if(!err&&docs.length==1){
            res.json({code:1,msg:"登录成功",name:req.body.name});
        }else{
            res.json({code:-1,msg:"登录失败"});
        }
    });

});
module.exports = router;