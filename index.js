const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const models = require('./models')
const session = require("express-session")
const sessionFileStore = require("session-file-store")(session)
const bcrypt = require("bcrypt")

const auth = require('./middlewares/auth')

const imagesRouter = require('./routes/images')
const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api')
const profileRouter = require('./routes/profile')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('uploads'))
app.use(express.static('dist'))
app.use(session({
  store: new sessionFileStore(),
  secret: 'keyboard cat',
  key: 'sid'
}))
app.use('/images', imagesRouter)
app.use('/', authRouter)
app.use('/api', apiRouter)
app.use('/profile', profileRouter)

app.listen(process.env.PORT || 3000, function(){
  console.log("server listen")
})

app.get('/', function(req, res){
  models.Image.findAll().then(function(images){
    res.render('index', {
      images: images
    })
  })
})

app.use((errorObj, req, res, next) => {
  console.log("     ===== START (Internnal Server Error 500.) =====     ")
  console.log(errorObj)
  console.log("     =====  END  =====     ")
  res.status(500).send("Internal Server Error 500.")
})