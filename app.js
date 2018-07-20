var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var addRouter = require('./routes/add');
var delRouter = require('./routes/del');
var updRouter = require('./routes/upd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//jade模板引擎使用参考：https://www.w3cplus.com/html/jade.html
app.set('view engine', 'jade');//默认模板引擎jade
//app.engine('.html', ejs.__express);//设置模板引擎为html -ejs
//app.set('view engine', 'html')
//需要安装ejs模块 npm install ejs -g
// ejs模板引擎使用方法 类似jsp
// 1、<% code %>用于执行其中javascript代码；
// 2、<%= code %>会对code进行html转义；
// 3、<%- code %>将不会进行转义；
//参考博客：https://blog.csdn.net/duan1987yj/article/details/77311919

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//添加路由映射
app.use('/add', addRouter);
app.use('/del', delRouter);
app.use('/upd', updRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
