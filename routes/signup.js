'use strict'
const express = require('express')
const models = require('../models')
const bcrypt = require("bcrypt")
const auth = require('../middlewares/auth')
const logoutChecker = require('../middlewares/logoutChecker')
const countries = require('../middlewares/countries')
const router = express.Router()

router.use(auth)
router.use(logoutChecker)
router.use(countries)

router.get('/', (req, res) => {
  const japan = req.countries.find(country => {
    return country.name.toLowerCase() === "japan"
  })

  res.render('signup', {
    form: {
      countryId: japan.id
    },
    countries: req.countries,
    errors: []
  })
})

router.post('/', (req, res, next) => {
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

  bcrypt.hash(pw, 10).then(hash => {
    models.User.create({
      email: req.body.email,
      password: hash,
      birthday: req.body.birthday,
      gender: req.body.gender,
      countryId: req.body.countryId,
    }).then(user => {
      // ToDo: サインアップ後にログインできているかチェックする。
      res.redirect('/')
    }).catch(errorObj => {
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

module.exports = router