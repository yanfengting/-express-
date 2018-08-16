// 用来处理http请求过程中出现的错误(异常)
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//morganmorgan是express默认的日志中间件，也可以脱离express，作为node.js的日志组件单独使用。
// 会在客户端记录请求的日志
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// 用来解析客户端传递的json格式的数据{name:dsh,}
app.use(express.json());
// 解析客户端传递的此种格式的数据 ？name=zs & age=90
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  // locals本地的错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // 设置App请求的状态  查http状态码
  /* 200 请求成功
  404 找不到,网页
  500 服务器错误 后台*/
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


