var express = require('express');
var router = express.Router();
//注销
router.get('/', function(req, res, next) {
  res.render('index');
});
module.exports = router;