const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models')
const session = require("express-session")
const bcrypt = require("bcrypt")

const auth = require('./middlewares/auth')
const imageRouter = require('./routes/image')
const authRouter = require('./routes/auth')
const ratingRouter = require('./routes/rating')

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use('/image', imageRouter)
app.use('/', authRouter)
app.use('/', ratingRouter)

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

app.use((errorObj, req, res, next) => {
  console.log(errorObj)
  res.status(500).send("Internal Server Error 500.")
})
