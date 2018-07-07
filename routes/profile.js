'use strict'

const express = require('express')
const router = express.Router()
const models = require('../models')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const countries = require('../middlewares/countries')

router.get('/', auth, countries, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  res.render('profile', {
    params: {
      birthday: req.user.birthday,
      gender: req.user.gender,
      countryId: req.user.countryId,
    },
    countries: req.countries,
    errors: []
  })
})

router.post('/', auth, countries, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  req.user.update({
    birthday: req.body.birthday,
    gender: req.body.gender,
    countryId: req.body.countryId,
  }).then((user) => {
    res.render('profile', {
      params: {
        birthday: req.body.birthday,
        gender: req.body.gender,
        countryId: req.body.countryId,
      },
      countries: req.countries,
      errors: []
    })
  })
})

module.exports = router