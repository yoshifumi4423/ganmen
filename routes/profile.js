'use strict'
const express = require('express')
const router = express.Router()
const models = require('../models')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const loginChecker = require('../middlewares/loginChecker')
const countries = require('../middlewares/countries')

router.use(auth)
router.use(loginChecker)
router.use(countries)

router.get('/', (req, res) => {
  res.render('profile', {
    form: req.user,
    countries: req.countries,
    errors: []
  })
})

router.post('/', (req, res, next) => {
  req.user.update({
    birthday: req.body.birthday,
    gender: req.body.gender,
    countryId: req.body.countryId,
  }).then((user) => {
    res.render('profile', {
      form: req.body,
      countries: req.countries,
      errors: []
    })
  }).catch(next)
})

module.exports = router