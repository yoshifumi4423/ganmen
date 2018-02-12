const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const models = require('./models')

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));

app.listen(process.env.PORT || 3000, function(){
  console.log("server listen");
});

app.get('/', function(req, res){
  models.Image.findAll().then(function(images){
    res.render('index', {
      images: images
    });
  })
})

app.post('/images', upload.single('faceImage'), function(req, res){
  console.log(req.file);
  console.log(models);
  models.Image.create(req.file).then(function(image){
    console.log(image);
    res.send('res_send');
  })
})
