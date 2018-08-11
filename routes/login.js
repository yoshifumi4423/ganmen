'use strict'
const express = require('express')
const router = express.Router()
const models = require('../models')
const bcrypt = require("bcrypt")
const auth = require('../middlewares/auth')
const logoutChecker = require('../middlewares/logoutChecker')
const AppError = require('../errors/AppError')

router.use(auth)
router.use(logoutChecker)

router.get('/', (req, res) => {	
  console.log("session : ", req.session.user)	
  res.render('login', {	
    form: {},	
    errors: []	
  })	
})

router.post('/', (req, res, next) => {	
  console.log("session : ", req.session.user)	
  models.User.findOne({	
    where:{	
      email: req.body.email	
    }
  }).then(user => {
    if (!user) {	
      throw new AppError("メールアドレスまたはパスワードが間違っています。")	
    }	
     return bcrypt.compare(req.body.password, user.password).then((result) => {	
      if (!result) {	
        throw new AppError("メールアドレスまたはパスワードが間違っています。")	
      }	
       req.session.user_id = user.id	
      res.send('res_send')	
    })
  }).catch(errorObj => {
    if (errorObj.name === 'AppError') {	
      return res.render('login', {	
        form: {	
          email: req.body.email	
        },	
        errors: [errorObj.message]	
      })	
    }	
    return next(errorObj)	
  })	
})

module.exports = router
