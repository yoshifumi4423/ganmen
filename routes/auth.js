'use strict'
const express = require('express')
const models = require('../models')
const bcrypt = require("bcrypt")
const auth = require('../middlewares/auth')
const countries = require('../middlewares/countries')
const router = express.Router()

router.get('/signup', auth, countries, function(req, res){
  res.render('signup', {
    params: {
      email: "",
      birthday: "",
      gender: "",
      countryId: 0,
    },
    countries: req.countries,
    errors: []
  })
})

router.post('/signup', auth, countries, function(req, res, next){
  const pw = req.body.password
  if(!pw){
    return res.render('signup', {
      params: req.body,
      countries: req.countries,
      errors: ["パスワードを入力してください。"]
    })
  }else if(pw.length < 8){
    return res.render('signup', {
      params: req.body,
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
      countryId: Number(req.body.countryId),
    }).then((user) => {
      // ToDo: サインアップ後にログインできているかチェックする。
      res.redirect('/')
    }).catch((errorObj) => {
      if(errorObj.name === 'SequelizeValidationError' ||
         errorObj.name === 'SequelizeUniqueConstraintError'){
          return res.render('signup', {
            params: req.body,
            countries: req.countries,
            errors: errorObj.errors.map(e => e.message)
          })
      }
      return next(errorObj)
    })
  })
})

router.get('/login', auth, function(req, res){
  console.log("session : ", req.session.user)
  res.render('login')
})

router.post('/login', auth, function(req, res){
  console.log("session : ", req.session.user)
  models.User.findOne({
    where:{
      email:req.body.email
    }
  }).then((user) => {
    bcrypt.compare(req.body.password, user.password).then((same) => {
      req.session.user_id = user.id
      res.send('res_send')
    })
  }).catch((errorObj) => {
    
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