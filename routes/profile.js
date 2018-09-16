'use strict'
const express = require('express')
const router = express.Router()
const models = require('../models')
const bcrypt = require('bcrypt')
const getDates = require('../utils/getDates')
const auth = require('../middlewares/auth')
const loginChecker = require('../middlewares/loginChecker')
const countries = require('../middlewares/countries')

router.use(auth)
router.use(loginChecker)
router.use(countries)

router.get('/', (req, res) => {
  const birthday = req.user.birthday.match(/^(\d*)-(\d*)-(\d*)/,)
  res.render('profile', {
    form: {
      birthdayYear: birthday[1],
      birthdayMonth: Number(birthday[2]),
      birthdayDay: Number(birthday[3]),

      gender: req.user.gender,
      countryId: req.user.countryId
    },
    years: getDates.years(),
    months: getDates.months(),
    days: getDates.days(),

    countries: req.countries,
    errors: []
  })
})

router.post('/', (req, res, next) => {
  req.user.update({
    birthday: [req.body.birthdayYear, req.body.birthdayMonth, req.body.birthdayDay].join("-"),
    gender: req.body.gender,
    countryId: req.body.countryId,
  }).then(user => {
    res.render('profile', {
      form: {
        birthdayYear: req.body.birthdayYear,
        birthdayMonth: req.body.birthdayMonth,
        birthdayDay: req.body.birthdayDay,
  
        gender: user.gender,
        countryId: user.countryId
      },
      years: getDates.years(),
      months: getDates.months(),
      days: getDates.days(),
      
      countries: req.countries,
      errors: []
    })
  }).catch(next)
})

module.exports = router