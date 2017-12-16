const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));

app.listen(process.env.PORT || 3000, function(){
  console.log("server listen");
});

app.get('/', function(req, res){
  res.render('index', {title: 'タイトル', message: 'メッセージ'});
})

app.post('/images', upload.single('faceImage'), function(req, res){
  console.log(req.file);
  res.send('res_send');
})
