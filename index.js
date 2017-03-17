const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const pug = require('pug');
app.set('view engine','pug');

const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
//加密用的，记住就行。

app.get('/',function(req,res){
  console.log('home page',req.session.username);
  let currentUser = req.session.username;
  res.render('index',{currentUser});
})

app.get('/hello',function(req,res){
  res.send(req.session.username)
})//访问localhost:3000/hello页面，出现username的值。

app.get('/login',function(req,res){
  res.sendFile('login.html',{root:'public'});
})

app.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
})

app.post('/login',function(req,res){
  let username = req.body.username;
  //User.find({username:username}) 如果在数据库中能够找到，密码正确才算登录成功。
  req.session.username = username ;
  if(true){
    res.redirect('/');//页面重定向，具体效果前端页面会自动跳转到指定页面，这是自动跳转到首页。
  }
  console.log(req.body);
})//要用req.body,需要把HTTP请求体里的文本转换成对象



app.listen(3000,function () {
    console.log('running on port 3000...');
})
