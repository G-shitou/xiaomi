var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');

var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var product=require('./routes/product');
var detail=require('./routes/detail');
var shop=require('./routes/shop');
var signout=require('./routes/signout');


//生成一个express实例 app
var app = express();

// view engine setup
// 设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
//设置视图模板引擎为html(开始的时候是ejs)
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);

// uncomment after placing your favicon in /public
// 设置/public/favicon.ico为favicon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//
//加载日志中间件。
app.use(logger('dev'));
//加载解析json的中间件
app.use(bodyParser.json());
//加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

//路由控制器
app.use('/', index);
app.use('/login', login);
app.use('/signup',signup);
app.use('/product',product);
app.use('/detail',detail);
app.use('/shop',shop);
app.use('/signout',signout);

//连接数据库
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/users')
.then(()=>console.log('connection succesful'))
.catch((err)=>console.error(err));
// catch 404 and forward to error handler
// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 开发和生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//导出app实例供其他模块调用。
module.exports = app;
