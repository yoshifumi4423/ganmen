const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.listen(process.env.PORT || 3000, function(){
  console.log("server listen");
});

app.get('/', function(req, res){
  res.render('index', {title: 'タイトル', message: 'メッセージ'});
})
