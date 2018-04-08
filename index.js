const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const models = require('./models')
const session = require("express-session")
const bcrypt = require("bcrypt")

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));

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
  models.Image.create(req.file).then(function(image){
    res.send('res_send');
  })
})

app.get('/signup', function(req, res){
  res.render('signup');
})

app.post('/signup', function(req, res){
  bcrypt.hash(req.body.password, 10).then(function(hash){
    models.User.create({
      email:req.body.email,
      password:hash
    }).then(function(user){
      res.send('res_send');
    })
  })
})

app.get('/login', function(req, res) {
  console.log("session : ", req.session.user)
  res.render('login')
})

app.post('/login', function(req, res){
  models.User.findOne({
    where:{
      email:req.body.email
    }
  }).then(function(user){
    bcrypt.compare(req.body.password, user.password).then(function(same){
      if (same) {
        console.log("認証！")
      }
      req.session.user_id = user.id
      res.send('res_send')
    })
  })
})

app.get('/logout', function(req, res){
  if (!req.session.user_id) {
    return res.redirect('/')
  }
  req.session.destroy()
  res.send('res_send')
})

app.get('/secret', function(req, res){
  const id = req.session.user_id
  if (!id) {
    return res.redirect('/')
  }

  models.User.findById(id).then(function(user){
    if (user) {
      res.render('secret')
    } else {
      res.redirect('/')
    }
  })
})
