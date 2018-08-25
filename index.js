'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const models = require('./models')
const session = require("express-session")
const sessionFileStore = require("session-file-store")(session)
const bcrypt = require("bcrypt")

const auth = require('./middlewares/auth')

const imagesRouter = require('./routes/images')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const apiRouter = require('./routes/api')
const profileRouter = require('./routes/profile')
const accountRouter = require('./routes/account')
const summaryRouter = require('./routes/summary')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('uploads'))
app.use(express.static('dist'))
app.use(express.static('css'))
app.use(session({
  store: new sessionFileStore(),
  secret: 'keyboard cat',
  key: 'sid'
}))
app.use('/images', imagesRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/api', apiRouter)
app.use('/profile', profileRouter)
app.use('/account', accountRouter)
app.use('/summary', summaryRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log("server listen")
})

app.get('/', (req, res) => {
  res.render('index')
})

app.use((errorObj, req, res, next) => {
  console.log("     ===== START (Internnal Server Error 500.) =====     ")
  console.log(errorObj)
  console.log("     =====  END  =====     ")
  res.status(500).send("Internal Server Error 500.")
})