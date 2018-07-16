'use strict'
const express = require('express')
const models = require('../models')
const bcrypt = require("bcrypt")
const auth = require('../middlewares/auth')
const countries = require('../middlewares/countries')
const AppError = require('../errors/AppError')
const router = express.Router()

router.get('/signup', auth, countries, function(req, res){
  if (req.user) {
    res.redirect('/')
  }

  res.render('signup', {
    form: {},
    countries: req.countries,
    errors: []
  })
})

router.post('/signup', auth, countries, function(req, res, next){
  if (req.user) {
    res.redirect('/')
  }

  const pw = req.body.password
  if(!pw){
    return res.render('signup', {
      form: req.body,
      countries: req.countries,
      errors: ["パスワードを入力してください。"]
    })
  }else if(pw.length < 8){
    return res.render('signup', {
      form: req.body,
      countries: req.countries,
      errors: ["パスワードを8文字以上で入力してください。"]
    })
  }

  bcrypt.hash(pw, 10).then((hash) => {
    models.User.create({
      email: req.body.email,
      password: hash,
      birthday: req.body.birthday,
      gender: req.body.gender,
      countryId: req.body.countryId,
    }).then((user) => {
      // ToDo: サインアップ後にログインできているかチェックする。
      res.redirect('/')
    }).catch((errorObj) => {
      if(errorObj.name === 'SequelizeValidationError' ||
         errorObj.name === 'SequelizeUniqueConstraintError'){
          return res.render('signup', {
            form: req.body,
            countries: req.countries,
            errors: errorObj.errors.map(e => e.message)
          })
      }
      return next(errorObj)
    })
  })
})

router.get('/login', auth, function(req, res){
  if (req.user) {
    res.redirect('/')
  }

  console.log("session : ", req.session.user)
  res.render('login', {
    form: {},
    errors: []
  })
})

router.post('/login', auth, function(req, res){
  if (req.user) {
    res.redirect('/')
  }

  console.log("session : ", req.session.user)
  const result = models.User.findOne({
    where:{
      email: req.body.email
    }
  }).then((user) => {
    if (!user) {
      throw new AppError("メールアドレスまたはパスワードが間違っています。")
    }

    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (!result) {
        throw new AppError("メールアドレスまたはパスワードが間違っています。")
      }

      req.session.user_id = user.id
      res.send('res_send')
    }).catch((errorObj) => {
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
  }).catch((errorObj) => {
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

router.get('/logout', auth, function(req, res){
  if (!req.user) {
    return res.redirect('/')
  }

  req.session.destroy()
  res.send('res_send')
})

module.exports = router