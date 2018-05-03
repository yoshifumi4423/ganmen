const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models')
const session = require("express-session")
const bcrypt = require("bcrypt")

const auth = require('./middlewares/auth')
const imageRouter = require('./routes/image')
const authRouter = require('./routes/auth')

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use('/image', imageRouter)
app.use('/', authRouter)

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

app.get('/secret', function(req, res){
  if (!req.user) {
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
