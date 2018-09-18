'use strict'
const express = require('express')
const router = express.Router()
const models = require('../models')
const bcrypt = require("bcrypt")
const getDates = require('../utils/getDates')
const auth = require('../middlewares/auth')
const sendMail = require('../utils/sendMail')
const mailOptions = require('../utils/mailOptions')
const logoutChecker = require('../middlewares/logoutChecker')
const countries = require('../middlewares/countries')

router.use(auth)
router.use(logoutChecker)
router.use(countries)

router.get('/', (req, res) => {
  const japan = req.countries.find(country => {
    return country.name.toLowerCase() === "japan"
  })

  res.render('signup', {
    form: {
      birthdayYear: 1980,
      birthdayMonth: 1,
      birthdayDay: 1,

      countryId: japan.id
    },
    years: getDates.years(),
    months: getDates.months(),
    days: getDates.days(),
    
    countries: req.countries,
    errors: []
  })
})

router.post('/', (req, res, next) => {
  const pw = req.body.password
  if(!pw){
    req.errors = ["パスワードを入力してください。"]
    return next()
  }else if(pw.length < 8){
    req.errors = ["パスワードを8文字以上で入力してください。"]
    return next()
  }

  bcrypt.hash(pw, 10).then(hash => {
    models.User.create({
      email: req.body.email,
      password: hash,
      birthday: [req.body.birthdayYear, req.body.birthdayMonth, req.body.birthdayDay].join("-"),
      gender: req.body.gender,
      countryId: req.body.countryId,
    }).then(user => {
      let option = JSON.parse(JSON.stringify(mailOptions))
      option.signup.to = user.email
      option.signup.html = option.signup.html.join("\n")
      sendMail(option.signup).then(info => {
        console.log("Sent email after user's signup.\n", info)
      }).catch(next)
      res.redirect('/')
    }).catch(errorObj => {
      if(errorObj.name === 'SequelizeValidationError' ||
         errorObj.name === 'SequelizeUniqueConstraintError'){
          req.errors = errorObj.errors.map(e => e.message)
          return next()
      }
      next(errorObj)
    })
  })
}, (req, res) => {
  res.render('signup', {
    form: {
      birthdayYear: req.body.birthdayYear,
      birthdayMonth: req.body.birthdayMonth,
      birthdayDay: req.body.birthdayDay,

      email: req.body.email,
      gender: req.body.gender,
      countryId: req.body.countryId
    },
    years: getDates.years(),
    months: getDates.months(),
    days: getDates.days(),
    
    countries: req.countries,
    errors: req.errors
  })
})

module.exports = router
