var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
// view engine setup
//
// 以下代码引入art-template的配置信息
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置express框架的静态文件目录
// 在静态文件目录中的文件可以直接进行访问
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/login/',require('./routes/admin/admin_user'))
app.use('/admin/student/', require('./routes/admin/student'));
// 前端展示页面 用户信息部分
app.use('/user/',require('./routes/user'))
app.use('/books/',require('./routes/books'))
// 页面重定向到书籍列表页
app.get('/',(req,res)=>{
  res.redirect('/books/list')
})
app.listen(3000,function(){
  console.log('服务器运行与于3000端口....')
})
